// 在一个自定义模块中，默认情况下，module.exports = {}
const age = 20

// 向 module.exports 对象上挂载 username 属性
exports.username = 'aa'
// 向 module.exports 对象上挂载 sayHello 方法
exports.sayHello = function () {
  console.log('Hello')
  return '返回值'
}
exports.age = age
module.exports = {
  age: 11,
}
