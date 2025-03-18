var express = require('express')
const app = express()

// 1.导入路由模块
const router = require('./router')
// 2.注册路由模块

app.use('/api', router) //前缀可有可无

app.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
