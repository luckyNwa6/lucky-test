const { add } = require('./fn')
test.skip('1+2=3', () => {
  //skip跳过当前测试
  expect(add(1, 2)).toBe(3)
})

test('3+2=5', () => {
  expect(add(3, 2)).toBe(5)
})

const { JSDOM } = require('jsdom')

const jsDomIntance = new JSDOM(`
<!DOCTYPE html>
<body>
<div>
    <div id="sum">sum</div>
    <button id="btn" οnclick="add(1, 2)">Click me</button>
</div>
</body>
</html>
`)
const window = jsDomIntance.window // window 对象
const document = window.document // document 对象
global.document = document

const { add2 } = require('./fn')

test('dom 1+2=3', () => {
  add2(1, 2)
  expect(document.getElementById('sum').innerHTML).toBe('3')
})

//参数化测试
test.each([
  [1, 1, 2],
  [-1, 2, 1],
  [2, 1, 3],
])('%i + %i equals %i', (a, b, expected) => {
  expect(add(a, b)).toBe(expected)
})
//分组测试
