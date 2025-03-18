const http = require('http')
const server = http.createServer()

const myNode = require('./myNode')
console.log(myNode.sayHello())

server.on('request', function (req, res) {
  const url = req.url // 1．获取请求的url地址
  let content = '<h1>404 Not found!</h1>' // 2．设置默认的内容为404 Not found
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>' // 3．用户请求的是首页
  } else if (url === '/about.html') {
    content = '<h1>关于页面</h1>' // 4．用户请求的是关于页面
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8') // 5．设置Content-Type响应头,防止中文乱码
  res.end(content) // 6．把内容发送给客户端
})

server.listen(8080, () => {
  console.log('http server running at http://127.0.0.1:8080')
})
