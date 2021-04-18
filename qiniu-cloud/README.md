2021-04-18

Express + 七牛云-对象存储 上传文件

#### 安装SDK

推荐使用npm来安装

```
$ npm install qiniu
```

创建各种上传凭证之前，我们需要定义好其中鉴权对象`mac`：

```javascript
const multer = require("multer");// npm install multer 文件上传中间件
// 七牛云模块
const qiniu = require('qiniu')
let accessKey = 'your access key';//可在个人中心查看
let secretKey = 'your secret key';//可在个人中心查看
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let options = {
    scope: 'xxx', //空间的名字
};
let putPolicy = new qiniu.rs.PutPolicy(options);
let uploadToken = putPolicy.uploadToken(mac);
let config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;//华东区
// 是否使用https域名
config.useHttpsDomain = true;
// 上传是否使用cdn加速
config.useCdnDomain = true;
const baseUrl = 'xxx' //七牛云空间访问的域名
//七牛云 - 对象存储 - 图片上传
// 上传图片
router.post('/qiniu_upload', multer({dest: "./public/img/",}).array("file", 1), function (req, res, next) {
    let files = req.files;
    let file = files[0];
    let name = Date.now().toString()
    let suffix = '.png'
    let path = "./public/img/" + name + suffix;
    fs.renameSync("./public/img/" + file.filename, path);
    let localFile = path;
    let formUploader = new qiniu.form_up.FormUploader(config);
    let putExtra = new qiniu.form_up.PutExtra();
    let key = name + suffix;
    // 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra,
        function (respErr, respBody, respInfo) {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                res.json({
                    status: '200',
                    result: {
                        path: baseUrl + respBody.key
                    },
                    msg: 'ok'
                })
            } else {
                res.json({
                    status: '-1',
                    result: {},
                    msg: '上传失败'
                })
            }
            fs.unlinkSync(path);
        });
})
```

