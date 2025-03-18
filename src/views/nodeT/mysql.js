// 1．导入mysql模块
const mysql = require('mysql')
// 2．建立与 MySQL 数据库的连接
const db = mysql.createPool({
  host: '127.0.0.1', //数据库的IP地址
  user: 'root', // 登录数据库的账号
  password: '123456', // 登录数据库的密码
  database: 'lock', //指定要操作哪个数据库
})
// 查
db.query('select * from db_stock', (err, results) => {
  if (err) return console.log(err.message)
  // 只要能打印出[ RowDataPacket { '1':1 }]的结果，就证明数据库连接正常
  console.log(results)
})

//新增数据1
const user = { product_code: '10086', stock_code: '12222', count: 100, version: 0 }
//2．待执行的SQL语句，其中英文的?表示占位符
const sqlStr = 'INSERT INTO db_stock (product_code, stock_code, count, version) VALUES (?, ?, ?, ?)'
// 3．使用数组的形式，依次为?占位符指定具体的值
db.query(sqlStr, [user.product_code, user.stock_code, user.count, user.version], (err, results) => {
  if (err) return console.log(err.message) //失败
  if (results.affectedRows === 1) {
    console.log('插入数据成功1')
  } //成功
})
//新增数据2
const user2 = { product_code: '10086', stock_code: '12222', count: 100, version: 0 }
//2．待执行的SQL语句，其中英文的?表示占位符
const sqlStr2 = 'INSERT INTO db_stock SET ?'
// 3．使用数组的形式，依次为?占位符指定具体的值
db.query(sqlStr2, user2, (err, results) => {
  if (err) return console.log(err.message) //失败
  if (results.affectedRows === 1) {
    console.log('插入数据成功2')
  } //成功
})
//修改
const user3 = { id: 3, product_code: '2', stock_code: '2', count: 1, version: 0 }
//2．待执行的SQL语句，其中英文的?表示占位符
const sqlStr3 = 'UPDATE   db_stock SET ? WHERE id = ?'
// 3．使用数组的形式，依次为?占位符指定具体的值
db.query(sqlStr3, [user3, user3.id], (err, results) => {
  if (err) return console.log(err.message) //失败
  if (results.affectedRows === 1) {
    console.log('更新数据成功!')
  } //成功
})

//物理删除,逻辑就改个状态就行了
const sqlStrDel = 'DELETE FROM    db_stock  WHERE id = ?'
// 3．使用数组的形式，依次为?占位符指定具体的值
db.query(sqlStrDel, 5, (err, results) => {
  if (err) return console.log(err.message) //失败
  if (results.affectedRows == 1) {
    console.log('删除数据成功! ')
  } //成功
})
