// 1．导入express
//https://blog.csdn.net/m0_55534317/article/details/126101820?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522171105762616777224442750%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=171105762616777224442750&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-126101820-null-null.142^v99^pc_search_result_base8&utm_term=nodejs&spm=1018.2226.3001.4187
const express = require('express')
// 2．创建web服务器
const app = express()

app.use(function (req, res, next) {
  //这是全局中间件，可以将方法抽离用一个const接收，再給api下面,再补一个接收的参数，就是局部中间件
  //中间件需要next传递,从上到下可以多弄几个中间件处理数据
  // 获取到请求到达服务器的时间
  const time = Date.now()
  // 为req对象，挂载自定义属性，从而把时间共享给后面的路由
  req.startTime = moment(time)
  next()
})

// 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  // 调用express提供的res.sent()方法，向客户端发送JSON对象
  // console.log(req.query) //请求的参数

  res.send({ name: 'zs', age: 20, gender: '男', time: req.startTime })
})
app.post('/api/login', (req, res) => {
  // 调用express提供的res.sent()方法，向客户端发送文本内容
  res.send('请求成功')
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }
  req.session.user = req.body //将用户的信息，存储到Session中
  req.session.islogin = true //将用户的登录状态，存储到Session中
  res.send({ status: 0, msg: '登录成功' })
})
//获取用户姓名的接口
app.get('/api/username ', (req, res) => {
  //判断用户是否登录
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: 'fail' })
  }
  res.send({ status: 0, msg: 'success', username: req.session.user.username })
})

// 退出登录的接口
app.post('/api/logout', (req, res) => {
  //清空当前客户端对应的session信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})

// URL地址中，可以通过:参数名的形式，匹配动态参数值
app.get('/test/:id', (req, res) => {
  // req.params默认是一个空对象
  //里面存放着通过:动态匹配到的参数值
  console.log(req.params)
  res.send('你干嘛！')
})

app.use(function (err, req, res, next) {
  //错误级别的中间件，必须注册在所有路由之后
  console.log('发生了错误:' + err.message)
  res.send('Error! ' + err.message)
})
// 1．导入session中间件
var session = require('express-session')
// 2．配置Session中间件
app.use(
  session({
    secret: 'keyboard cat', // secret属性的值可以为任意字符串
    resave: false, // 固定写法
    saveUninitialized: true, //固定写法
  })
)

app.use(cors())
//需要多个目录，也可以再弄一行换个路径
app.use(express.static('pic')) //pic文件夹和这个js同级创建静态资源服务器，本项目pic下的全部访问省略public,http://127.0.0.1/1.png

// 3．调用app.listen(端口号，启动成功后的回调函数)，启动服务果
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})

//npm install -g nodemon  会自动监听node项目文件的变动不需要重启，本来node来启动现在用nodemon app.js

// 中间件的5个使用注意事项
// 一定要在路由之前注册中间件
// 客户端发送过来的请求，可以连续调用多个中间件进行处理
// 执行完中间件的业务代码之后，不要忘记调用next()函数
// 为了防止代码逻辑混乱，调用next()函数后不要再写额外的代码
// 连续调用多个中间件时，多个中间件之间，共享req和res对象
