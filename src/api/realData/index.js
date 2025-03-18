import request from '@/utils/request'

// 查询站点列表
export function getStationList(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getStationList',
    method: 'get',
    params: query,
    headers: {
      Authorization: 'Bearer e3045730dd32435baaecb8ecb6e69bec', // 替换 yourToken 为实际的 token 值
    },
  })
}

// 根据站点id获取站点基本信息
export function getStationInfo(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getStationInfo',
    method: 'get',
    params: query,
  })
}

// 根据站点id获取设备信息
export function getDeviceInfo(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getDeviceInfo',
    method: 'get',
    params: query,
  })
}

// 根据站点id获取设备安装点位信息
export function getDevicePoint(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getDevicePoint',
    method: 'get',
    params: query,
  })
}

//获取管网监测当日最新数据
export function getPipeData(data) {
  return request({
    url: '/zhsw/real_time_monitoring/getPipeData',
    method: 'post',
    data: data,
  })
}
//获取管网监测当日最新数据 原水版本
export function getRawWaterData(data) {
  return request({
    url: '/zhsw/real_time_monitoring/getRawWaterData',
    method: 'post',
    data: data,
  })
}

//根据站点id集合获取要素列表
export function getStationFactors(query) {
  return request({
    url: '/zhsw/factor-template/getFactorElementsByStationIds',
    method: 'get',
    params: query,
  })
}

//实时数值根据设备获取要素列表
export function getStationFactorsByDevId(query) {
  return request({
    url: '/zhsw/dataMonitoring/queryFactorElementsByDeviceCode',
    method: 'get',
    params: query,
  })
}

//获取噪声监测当日最新数据
export function getLeakageData(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getLeakageData',
    method: 'get',
    params: query,
  })
}

//获取噪声监测图形
export function getLeakageGraph(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getLeakageGraph',
    method: 'get',
    params: query,
  })
}

//获取压力监测当日最新数据
export function getPressureData(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getPressureData',
    method: 'get',
    params: query,
  })
}
//获取压力监测图形
export function getPressureGraph(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getPressureGraph',
    method: 'get',
    params: query,
  })
}

//获取井盖监测当日最新数据
export function getManholeData(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getManholeData',
    method: 'get',
    params: query,
  })
}
//获取井盖监测图形
export function getManholeGraph(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getManholeGraph',
    method: 'get',
    params: query,
  })
}

//获取流量监测当日最新数据
export function getFlowData(query) {
  return request({
    url: '/zhsw/real_time_monitoring/gettFlowData',
    method: 'get',
    params: query,
  })
}
//获取流量监测图形
export function getFlowGraph(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getFlowGraph',
    method: 'get',
    params: query,
  })
}

//获取水质监测当日最新数据
export function getWaterData(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getWaterData',
    method: 'get',
    params: query,
  })
}
//获取水质监测图形
export function getWaterGraph(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getWaterGraph',
    method: 'get',
    params: query,
  })
}
//获取测点监测当日最新数据Lucky
export function getDeviceReportDataByTime(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getDeviceReportDataByTime',
    method: 'get',
    params: query,
  })
}
//获取测点监测图形Lucky
export function getDeviceGraph(data) {
  return request({
    url: '/zhsw/real_time_monitoring/getDeviceGraph',
    method: 'post',
    data,
  })
}

//获取测点监测图形Lucky
export function getDeviceFactor(query) {
  return request({
    url: '/zhsw/real_time_monitoring/getDeviceFactor',
    method: 'get',
    params: query,
  })
}
