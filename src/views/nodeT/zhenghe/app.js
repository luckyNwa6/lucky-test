const express = require('express')

const app = express()

const cors = require('cors')
app.use(cors()) //配置跨域

let session = require('express-session') // 导入session中间件
app.use(
  session({
    secret: 'lucky NN',
    resave: false, // 固定写法
    saveUninitialized: true, //固定写法
  })
)

const bodyParser = require('body-parser')
// 使用 body-parser 中间件来解析 application/x-www-form-urlencoded 格式的请求体
app.use(bodyParser.urlencoded({ extended: false }))
// 使用 body-parser 中间件来解析 application/json 格式的请求体
app.use(bodyParser.json())

const router = require('./router') //导入路由模块
app.use('/api', router) //前缀可有可无 注册路由模块

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1') //nodemon来启动服务
})
