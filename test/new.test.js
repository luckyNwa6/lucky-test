const { add } = require('./fn')
xtest('1+2=3', () => {
  //xtest跳过当前测试
  expect(add(1, 2)).toBe(3)
})

test('3+2=5', () => {
  expect(add(3, 2)).toBe(5)
})
