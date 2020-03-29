const nodemailer = require("nodemailer");
  //  发送邮件对象
  // createTransport 里的参数信息在node_modules/lib/well-known/service.js
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",   //发送什么邮箱，qq，网易。。。
    port: 465,     //端口号  
    secure: true, // 
    auth: {
      user: 'xxxxxxxx@qq.com', // 发送方邮箱
      pass: 'onwdcosvmuspbaeb' // 在发送方的邮箱获取smtp验证码
    }
  });
  // 邮件对象
  let sendObj = {
    from: '"掘金创作者👻" <1550832053@qq.com>', // 发送者
    to: "xxxxxxxx@qq.com, xxxxxxxx@qq.com", // 接收者（可群发，群发就逗号分割就可以）
    subject: "来自掘金的邀请", // 
    text: "掘金创作者", // 发送的内容
    html: `<b>掘金创作者邀请你体验掘金网站，本网站于2020年3月28日完成部署，本网站操作简单，欢迎体验！</b>
           <a href="http://47.93.54.147/#/home/recommended">点击进入掘金</a>
    ` 
  }
  // 发送邮件
  // 此中间件可以做qq邮件轰炸器（不介意）
  // 使用qq邮件轰炸器造成的后果就是官方会对发送方的qq账号进行封号 接收方的也会收到牵连 自己的公ip也会被封掉

transporter.sendMail(sendObj);
