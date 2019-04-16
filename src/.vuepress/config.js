// .vuepress/config.js

module.exports = {
  // 网站 Title
  title: 'Yiu Kuen Chu',

  // 网站描述
  description: '(ฅ´ω`ฅ) 摸鱼啦喂',

  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.png'
    }],
  ],
  // 网站语言
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },

  // 使用的主题
  theme: 'vuepress-theme-meteorlxy',

  // 主题配置
  themeConfig: {
    
    // 个人信息（没有或不想设置的，删掉对应字段即可）
    personalInfo: {
      // 昵称
      nickname: 'yiukuenchu',

      // 个人简介
      description: '真诚才是最大本领',

      // 电子邮箱
      email: 'yiukuenchu@gmail.com',

      // 所在地
      location: 'Shenzhen, China',

      // 组织
      organization: 'Sichuan University',

      // 头像
      avatar: '/avatar.jpg',

      // 社交平台帐号信息
      sns: {
        // Github 帐号和链接
        github: {
          account: '@yiukuenchu',
          link: 'https://github.com/yiukuenchu',
        },

        // Facebook 帐号和链接
        // facebook: {
        //   account: 'meteorlxy.cn',
        //   link: 'https://www.facebook.com/meteorlxy.cn',
        // },

        // LinkedIn 帐号和链接
        // linkedin: {
        //   account: 'meteorlxy',
        //   link: 'http://www.linkedin.com/in/meteorlxy',
        // },

        // Twitter 帐号和链接
        twitter: {
          account: '@yiukuenchu',
          link: 'https://twitter.com/yiukuenchu',
        },

        // 新浪微博 帐号和链接
        // weibo: {
        //   account: '@焦炭君_Meteor',
        //   link: 'https://weibo.com/u/2039655434',
        // },

        // 知乎 帐号和链接
        // zhihu: {
        //   account: 'meteorlxy.cn',
        //   link: 'https://www.zhihu.com/people/meteorlxy.cn',
        // },

        // // 豆瓣 帐号和链接
        // douban: {
        //   account: '159342708',
        //   link: 'https://www.douban.com/people/159342708',
        // },

        // Instagram 帐号和链接
        instagram: {
          account: '@yiukuenchu',
          link: 'https://www.instagram.com/yiukuenchu/',
        },
      },
    },

    // 上方 header 的背景，可以使用图片，或者随机变化的图案
    headerBackground: {
      // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
      url: '/assets/img/bg.jpg',

      // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为纯色背景
      useGeo: true,
    },

    // 是否显示文章的最近更新时间
    lastUpdated: true,

    // 顶部导航栏内容
    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Posts', link: '/posts/', exact: false },
      { text: 'About', link: '/about/'},
      { text: 'GitHub', link: 'https://github.com/yiukuenchu' },
    ],

    // 评论配置，参考下方 [页面评论] 章节
    comments: {
      owner: 'yiukuenchu',
      repo: 'yiukuenchu.github.io',
      clientId: '16a6bff985796e25235d',
      clientSecret: '7ad0c209994c61aaad141b2da29fe56ac34e90b9',
    },
  },
}