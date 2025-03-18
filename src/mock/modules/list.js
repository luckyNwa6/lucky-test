const test = {
  url: 'http://localhost:8889/test/list', // 正则匹配
  type: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          id: 1,
          username: 'zhoujielun',
          password: '123456',
        },
        {
          id: 2,
          username: 'guojingming',
          password: '666666',
        },
      ],
    }
  },
}

module.exports = [test]
