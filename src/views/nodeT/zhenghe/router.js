let express = require('express') //使用Express的路由，最简单是直接挂载再app上，不过不好
let router = express.Router()

router.post('/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== 'admin') {
    return res.send({ status: 1, msg: '登录失败' })
  }
  req.session.user = req.body //将用户的信息，存储到Session中
  req.session.isLogin = true //将用户的登录状态，存储到Session中
  console.log('登录成功的：', req.session)
  res.send({ status: 0, msg: '登录成功' })
})
//获取用户姓名的接口
router.get('/userInfo', (req, res) => {
  console.log('获取姓名接口:', req.session)
  if (!req.session.isLogin || !req.session.user) {
    return res.send({ status: 1, msg: '没有登录' })
  }
  res.send({ status: 0, msg: 'success', username: req.session.user.username })
})

// 退出登录的接口
router.post('/logout', (req, res) => {
  console.log('获取姓名接口:', req.session)
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})

router.use(function (err, req, res, next) {
  //错误级别的中间件，必须注册在所有路由之后
  console.log('发生了错误:' + err.message)
  res.send('Error! ' + err.message)
})

module.exports = router
