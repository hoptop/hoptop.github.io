---
title: 利用hexo在服务器快速搭建静态博客
date: 2016-05-19 09:25:20
tags:
---
以下操作建立有一个服务器（ubuntu 14.04)的基础上。
##第一步：安装hexo
安装hexo需要先安装node.js和git。

    sudo apt-get install git #安装git
    wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
    nvm install 4 #安装node.js
    npm install -g hexo-cli #安装 hexo
注：你可能会出现Permission denied问题，这个时候需要运行

    npm config set unsafe-perm true

##第二步：Setup
当Hexo安装好后，运行以下命令在指定文件夹(如mysite)初始化hexo
      
    $ hexo init mysite 
    $ cd mysite
    $ npm install
安装好的文件目录如下
![](http://upload-images.jianshu.io/upload_images/2013053-d04c6b055d058fa1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
_config.yml配置了网站的主要信息，包括标题，主题等各资源所在文件夹等。
##第三步：熟悉命令
    hexo init [folder] #初始化hexo，不加参数则在当前目录下。
    hexo new [layout] <title> #新建文章，layout不加时使用_config.yml的默认样式。
    hexo generate  #生成静态文件 -d 在文件生成后进行部署 -w 查看文件变化
    hexo publish [layout] <filename> #发布草稿
    hexo server #运行服务 -p, --port 端口 
    hexo deploy # 部署 -g 在部署钱生成文件
    hexo render <file1> [file2] ... #渲染文件
    hexo clean #清除缓冲文件 (db.json) 和生成 的(public)文件夹.
##第四步 ：修改主题(theme)
1.首先是下载主题
$ cd your-hexo-site
$ git clone https://github.com/iissnan/hexo-theme-next themes/next
2.然后修改[配置](http://theme-next.iissnan.com/getting-started.html)。这个不说了，安装官方文档自己修改。
##第五步：发布文章
首先创建一个文档

    hexo new 我的第一篇博客
这会产生一个在source/_posts\下产生同名的md文件，在该文件中添加正文。
然后运行 hexo server 就能看到更新了。
****
以上简单介绍如何用hexo创建一个博客站点，更多内容就看官方文档吧。
