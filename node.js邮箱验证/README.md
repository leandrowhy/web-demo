# Node.js 邮箱验证

### 一、安装邮箱发送模块依赖

```
npm i nodemailer -s
```

或

```
yarn add nodemailer
```

### 二、开启 POP3/SMTP 服务

你首先要有一个邮箱；由于需要使用 SMTP 方式发送，你还需要开启相关功能。你可以登录你的邮箱，然后开启这个设置。

以 QQ 邮箱为例：设置->账户->开启服务 (选择 POP3/SMTP 服务)->点击开启 (需要发送短信开启)->授权码生成。

### 三、创建 email.js

```javascript
'use strict'
const nodemailer = require('nodemailer')

// 创建发送邮件的对象
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', // 发送方邮箱 qq 通过lib/wel-konw
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: '******@qq.com', // 发送方邮箱地址
    pass: '******' // mtp 验证码 这个有了才可以发送邮件，可以qq邮箱去查看自己的码
  }
})

function send(mail, code) {
  // 邮件信息
  let mailobj = {
    from: '"发送者姓名" <发送者邮箱>', // sender address
    to: mail, // 接收者邮箱 可以是多个 以,号隔开
    subject: 'hello', // Subject line
    // 发送text或者html格式
    text: `xxxxx`
    // html:`<h1>xxxx</h1>`
  }

  return new Promise((reslove, reject) => {
    // 发送邮件
    transporter.sendMail(mailobj, (err, data) => {
      if (err) {
        console.log(err)
        reject()
      } else {
        reslove()
      }
    })
  })
}
```

### 四、发送验证码接口

```javascript
//验证码就放着内存中了。正常开发也可以放redis 或者 数据库内
let codes = {}
let count = {}
router.post('/getMailCode', (req, res) => {
  let { mail } = req.body
  // 我前端已做邮箱校验 这里我只做了是否有值判断
  if (mail) {
    let code = parseInt(Math.random() * 10000) // 随机验证码
    codes[mail] = code
    count[mail] = 3 // 有效次数
    //验证码5分钟内有效 过了5分钟清除
    setTimeout(() => {
      delete codes[mail]
      delete count[mail]
    }, 300000)
    mailSend
      .send(mail, code)
      .then(() => {
        res.send({ code: 200, msg: '验证码发送成功' })
      })
      .catch(err => {
        res.send({ code: -1, msg: '验证码发送失败' })
      })
  } else {
    res.send({ err: -1, msg: '参数错误' })
  }
})
```

### 结语

如果是用短信验证码的话，无疑成本高，因为短信是收费的。想想做一个学习用的网站，还是选择邮件发送验证码吧。
