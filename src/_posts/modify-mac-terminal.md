---
category: 
tags:
  - terminal
date: 2018-12-24
title: 用这个解决方案美化你的Mac终端
vssue-title: modify-mac-terminal
---



> “好看是第一生产力。”     
> --by SpencerWoo
  
对于普通用户来说，macOS自带的Terminal已经是够用。但如果你对它有所不满，期待一个更美观没强大的终端。那么，你应该往下看。😄
## 准备清单📦
- iTerm2
- zsh
- oh-my-zsh

## 什么是iTerm2？
简单来说，iTerm2是一款比Terminal更强大的macOS终端。
[点击下载iTerm2](https://www.iterm2.com/downloads.html)

## 安装 oh-my-zsh
[oh-my-zsh官网](https://ohmyz.sh/)

- via curl：
```
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
 
- via wget：
```
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

## 安装 Powerline Fonts
[oh-my-zsh的Github地址](https://github.com/robbyrussell/oh-my-zsh/)

- via git：
```
git clone https://github.com/powerline/fonts.git --depth=1; cd fonts; ./install.sh; cd ..; rm -rf fonts
```
安装完后，打开iTerm2的设置，在Profile中找到Text，点击Change Font即可修改字体，我用的字体是 **Meslo LG M Regular for Powerline**。
![](https://ws3.sinaimg.cn/large/006tKfTcgy1g078c4t58sj31ga0u0wtt.jpg)
  
接着修改字体颜色，在Profile里找到Color。我推荐使用 **Solarized Dark**。
![](https://ws3.sinaimg.cn/large/006tKfTcgy1g0784y62jlj31jj0u07jl.jpg)

## 配置主题
安装了oh-my-zsh后，就可以通过下面的命令查看所有默认主题：
```
ls ~/.oh-my-zsh/themes
```
通过下面的命令，打开配置文件：
```
vim ~/.zshrc
```
将ZSH_THEME 的值改为 ZSH_THEME="agnoster"，保存退出。

## gruvbox
[gruvbox](https://github.com/morhetz/gruvbox)是一款沿用Solarized的配色方案而衍生出来的主题，下面是它的效果：
![](https://ws3.sinaimg.cn/large/006tKfTcgy1g078qhjwqdj31k30u0aqu.jpg)

感兴趣的小伙伴自行研究研究吧。
 
感谢阅读。❤️

