const userList = {
  url: '/user/list', // 正则匹配
  type: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          id: 1,
          username: '小微',
          password: '123456',
        },
        {
          id: 2,
          username: '小王',
          password: '666666',
        },
      ],
    }
  },
}


module.exports = [userList]
