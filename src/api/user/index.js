import request from '@/utils/request'

//访问nodejs服务
export function userList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params: params,
  })
}
//开源的el里的下拉框里的城市列表
export function getOpenCityList(query) {
  return request({
    url: `https://cli.avuejs.com/api/area/getProvince?id=${query}`,
    method: 'get',
  })
}

//获取lucky_api后端---公开的用户信息列表
export function getUserInfoList(data) {
  return request({
    url: '/api/openApi/getUserList',
    method: 'post',
    data,
  })
}

export function addOrUpdateInfo(url, data) {
  return request({
    url: `/api/openApi/${url}`,
    method: 'post',
    data,
  })
}
