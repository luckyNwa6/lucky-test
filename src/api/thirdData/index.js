import request from '@/utils/request'


const baseUrl = '/irrigation-monitoring-platform/irrigation-info/water-data/'

export default {
  page(query) {
    return request({
      url: `${baseUrl}page`,
      method: 'get',
      params: query
    })
  },
  // 导入模板下载
  exportTemplate(query = {}) {
    return request({
      url: `${baseUrl}export`,
      method: 'get',
      params: query,
      responseType: 'blob'
    })
  },
  export(query) {
    return request({
      url: `${baseUrl}exportData`,
      method: 'get',
      params: query,
      responseType: 'blob'
    })
  },
  import(data, query = {}) {
    return request({
      url: `${baseUrl}import`,
      method: 'post',
      params: query,
      data: data
    })
  }
}
