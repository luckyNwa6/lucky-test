const Mock = require('mockjs')
const mockFiles = require.context('./modules', false, /\.js$/) // 适用于Vue2
// const baseUrl = "https://localhost:8081"
let mocks = []

mockFiles.keys().forEach((key) => {
  //获取modules下的全部js
  // console.log('🚀 ~ mockFiles.keys ~ key:', key)

  mocks.push(...mockFiles(key))
})
//mock模拟里面的数据
mocks.forEach((item) => {
  console.log('🚀 ~ mocks.forEach ~ item:', item)
  Mock.mock(item.url, item.type, item.response)
})
// Mock.mock(/\/irrigation-monitoring-platform\/irrigation-info\/water-data\/page(\?.*)?/, 'get', options => {
//   const urlParams = new URLSearchParams(options.url.split('?')[1]);
//   const queryParams = Object.fromEntries(urlParams.entries());
//   console.log("🚀 ~ queryParams:", queryParams);

//   // 这里可以根据需要进行处理，并返回相应的模拟数据
//   return Mock.mock({
//     status: 400,
//     msg: '添加失败，id已存在'
//   });
// });
