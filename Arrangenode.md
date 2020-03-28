### 如何在阿里云上部署node
+ 这里介绍两种方法
  1. 自行安装版
  2. 宝塔linux版（推荐）
>一.自行上安装版
### 1.配置安全组
---
+ 首先你必须有一台属于自己服务器（没服务器下面的就别看了，继续去敲代码吧）
+ 登录阿里云
   + 点击控制台
   + 点击左侧云服务器ECS 
   + 点击自己公网ip
      + （配置安全组）点击左侧的本实列安全组
        + 点击安全组列表的配置规则
        + 右上角有两个选项 添加安全组规则 快速创建规则 （如果不想复杂创建就直接点击快速创建即可，自己百度查看如何配置）
        + 配置自己服务器上的安全组（安全组端口要与自己node的端口相同）

*** 有条件可以考虑阿里node微型服务器与mongoDB数据库（也可自行安装） ***
### 2.安装node
---
  + 下载node压缩包
  ```cmd
  wget http://nodejs.org/dist/v0.10.18/node-v0.10.18.tar.gz
  ```
  + 解压node
  ``` cmd
  tar zxf node-v0.10.18.tar.gz 
  ```
  + 执行配置脚本来进行编译预处理:
  ``` cmd
  ./configure
  ```
  + 开始编译源代码
  ``` cmd
  make
  ```
  + 当编译完成后，我们需要使之在系统范围内可用, 编译后的二进制文件将被放置到系统路径，默认情况下，Node二进制文件应该放在/user/local/bin/node文件夹下:
  ``` cmd
  make install
  ```
  + 现在已经安装了Node.js, 可以开始部署应用程序, 首先要使用Node.js的模块管理器npm安装Express middleware 和forever（一个用来确保应用程序启动并且在需要时重启的非常有用的模块）：
  ``` cmd
  npm -g install express forever
  ``` 
  + 建立超级链接, 不然 sudo node 时会报 "command not found"
  ``` cmd
    sudo ln -s /usr/local/bin/node /usr/bin/node 
    sudo ln -s /usr/local/lib/node /usr/lib/node 
    sudo ln -s /usr/local/bin/npm /usr/bin/npm 
    sudo ln -s /usr/local/bin/node-waf /usr/bin/node-waf 
    sudo ln -s /usr/local/bin/forever /usr/bin/forever
  ```
### 安装mongodb（在项目中使用的数据库）
 + 安装说明：
    + 系统环境：Centos-6.5
    + 安装软件：mongodb-linux-x86_64-2.4.9.tgz
    + 下载地址：http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.4.9.tgz
    + 上传位置：/usr/local/
    + 软件安装位置：/usr/local/mongodb
    + 数据存放位置：/var/mongodb/data
    + 日志存放位置：/var/mongodb/logs
+ 进入文件夹/usr/local,下载mongodb源代码：
   ``` cmd
    cd /usr/local
    wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.4.9.tgz
   ```
+ 解压安装包，重命名文件夹为mongodb
  ``` cmd
    tar zxvf mongodb-linux-x86_64-2.4.9.tgz 
    mv mongodb-linux-x86_64-2.4.9 mongodb
  ```    
+ 在var文件夹里建立mongodb文件夹，并分别建立文件夹data用于存放数据，logs用于存放日志 
``` cmd
mkdir /var/mongodb
mkdir /var/mongodb/data
mkdir /var/mongodb/logs
``` 
+ 这里省略如何启动MongoDB如果你会window启动这里也不是问题

>介绍宝塔linux(如果自己想在云服务器上快速搭建一个node mongo 的环境推荐使用宝塔linux)
---
1. 在宝塔linux面板左侧的软件商店下载一下配置和更改配置
    + 下载PM2管理器  并开启（一般情况下默认开启）
       - 安装了pm2 就不用安装node
       - pm2它是 node.js管理器，集成了 node.js + npm + nvm + pm2.!
       - pm2 它可以长启动在自己服务器上 并且启动的后可以执行其他命令操作
       - 直接node xxx.js启动服务后只能强行执行ctrl+c停止才可以执行其他命令操作
    + Nginx（无需使用Nginx代理node）
       - 主要作用用来跑前端项目  
    + 下载MongoDB   并开启（一般情况下默认开启）
       - 基于分布式文件存储的数据库，旨在为WEB应用提供可扩展的高性能数据存储解决方案!
    + 放行端口（因为自己当初就是踩的这个坑，导致node一直没有办法运行，要理解设置安全组与在宝塔linux设置放行端口要同时设置因为宝塔有防火墙）  
       - 直接点击左侧安全 
         + 在防火墙上面输入自己node项目的端口，点击放行备注：node    
2. 在Xshell命令行下需要一下操作（如何自己设置ssh这里也不做过多解释）
    + 将自己的node项目放到www/elm下  （elm需要自己建立）
      - 可以使用本地cmd 链接云服务器 并直接上传
      - 推荐使用Xftp（百度查看如何下载）
        -直接把node项目托到www/elm目录下  
    + 使用pm2启动node服务命令
    ``` cmd
        pm2 start xxx.js //启动指定node服务
        pm2 start all  //启动全部node服务
        pm2 stop all //关闭所有node服务
        pm2 stop xxx.js //关闭指定node服务
        pm2 ls 查看所有node启动项
    ```
3. 测试node服务是否启动成功
   + 在浏览器上输入IP：端口/api地址直接浏览 查看是否成功
   + 使用postman输入IP：端口/api地址直接send一下 查看是否成功
    