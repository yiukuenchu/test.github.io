---
category: 
tags:
  - vue
date: 2019-04-19
title: 关于 Vue-Router 的感想
vssue-title: thoughts about vue router
---

> 路由让体验更美好。
# 前言
最近做了个 Vue 项目，这篇文章很大程度上参考了官网和大佬们的资料，算做是复习一遍。🖐️  

BTW，上述项目我部署在了 Heroku 上：[badge-the-cover](https://badgethecover.herokuapp.com/)  

你要是觉得有趣，不妨去[「GitHub」](https://github.com/yiukuenchu/badge-the-cover)给我一个 star! ⭐️
# 什么是 Router？
在说 Vue-Router 之前，我们先来复习一下 Router，也就是路由，是个什么东西。  

路由又分后端路由和前端路由。总结来说，前端路由就是通过分配不同的 url 路径，来请求不同的资源，从而映射出不同的视图。  

# 什么是 Vue-Router？
用以下一个简单的实例来说明吧：
```
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter)

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
const app = new Vue({
  el: '#app',
  render(h) {
    return h(App)
  },
  router
})
```
- 从上面的代码中，可以看到 Vue 是通过 `Vue.use(VueRouter)` 注入路由的。
- `const Foo` 和 `const Bar` 是用来定义路由组件。 
- `const routes` 则用来定义路由，每个路由映射一个组件。 
- `const router = new VueRouter` 是用来创建 router 实例。 生成实例过程中，主要做了以下两件事 ：
1.根据配置数组（传入的 routes）生成路由配置记录表。 
2.根据不同模式 `mode` 生成监控路由变化的 `history` 对象。
- `const app = new Vue` 用来创建和挂载根实例，让整个应用都有路由功能。

# 创建路由匹配对象
在 `src/create-matcher.js` 中，我们可以看到 matcher 的实现：
```
export type Matcher = {
  match: (raw: RawLocation, current?: Route, redirectedFrom?: Location) => Route;
  addRoutes: (routes: Array<RouteConfig>) => void;
};
```
- Vue-Router 中定义的 `Location` 用来结构化描述 `url`。
- `createMatcher` 函数的作用就是创建路由映射表，然后通过闭包的方式让 `addRoutes` 和 `match` 函数能够使用路由映射表的几个对象，最后返回一个 `Matcher` 对象。

# 路由跳转
`history.transitionTo` 是 Vue-Router 中非常重要的方法，当我们切换路由线路的时候，就会执行到该方法。它的定义在 `src/history/base.js` 中：
```
transitionTo (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  const route = this.router.match(location, this.current)
  this.confirmTransition(route, () => {
    this.updateRoute(route)
    onComplete && onComplete(route)
    this.ensureURL()

    if (!this.ready) {
      this.ready = true
      this.readyCbs.forEach(cb => { cb(route) })
    }
  }, err => {
    if (onAbort) {
      onAbort(err)
    }
    if (err && !this.ready) {
      this.ready = true
      this.readyErrorCbs.forEach(cb => { cb(err) })
    }
  })
}
```
- `transitionTo` 首先根据目标 `location` 和当前路径 `this.current` 执行 `this.router.match` 方法去匹配到目标的路径。
- 拿到新的路径后，那么接下来就会执行 `confirmTransition` 方法去做真正的切换，由于这个过程可能有一些异步的操作（如异步组件），所以整个 `confirmTransition` API 设计成带有成功回调函数和失败回调函数。

# 导航守卫
```
const queue: Array<?NavigationGuard> = [].concat(
    // 失活的组件钩子
    extractLeaveGuards(deactivated),
    // 全局 beforeEach 钩子
    this.router.beforeHooks,
    // 在当前路由改变，但是该组件被复用时调用
    extractUpdateHooks(updated),
    // 需要渲染组件 enter 守卫钩子
    activated.map(m => m.beforeEnter),
    // 解析异步路由组件
    resolveAsyncComponents(activated)
)
```
它的工作流程为：
1. 在失活的组件里调用离开守卫。

2. 调用全局的 beforeEach 守卫。

3. 在重用的组件里调用 beforeRouteUpdate 守卫。

4. 在激活的路由配置里调用 beforeEnter。

5. 解析异步路由组件。
之后，会执行一个 `runQueue` 的回调函数：
```
runQueue(queue, iterator, () => {
  const postEnterCbs = []
  const isValid = () => this.current === route
  const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)
  const queue = enterGuards.concat(this.router.resolveHooks)
  runQueue(queue, iterator, () => {
    if (this.pending !== route) {
      return abort()
    }
    this.pending = null
    onComplete(route)
    if (this.router.app) {
      this.router.app.$nextTick(() => {
        postEnterCbs.forEach(cb => { cb() })
      })
    }
  })
})
```
6. 执行 `beforeRouteEnter` 导航守卫钩子，`beforeRouteEnter` 钩子不能访问 `this` 对象，因为钩子在导航确认前被调用，需要渲染的组件还没被创建。但是该钩子函数是唯一一个支持在回调中获取 `this` 对象的函数，回调会在路由确认执行。

7. 执行 `beforeResolve` 导航守卫钩子，如果注册了全局 `beforeResolve` 钩子就会在这里执行。

8. 导航确认，调用 `afterEach` 导航守卫钩子.

最后确认执行 `onComplete(route)` 后，会执行 `this.updateRoute(route)` 方法：
```
updateRoute (route: Route) {
  const prev = this.current
  this.current = route
  this.cb && this.cb(route)
  this.router.afterHooks.forEach(hook => {
    hook && hook(route, prev)
  })
}
```

