import Vue from 'vue'
import axios from 'axios'
import { Notification, MessageBox, Message, Loading } from 'element-ui'
const request = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 60 * 2,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

/**
 * 请求拦截
 */
request.interceptors.request.use(
  (config) => {
    // config.headers['token'] = Vue.cookie.get('share_wiring_token') // 请求头带上token
    // config.headers['language'] = localStorage.getItem('language') // 请求头带上中英文切换
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 */
request.interceptors.response.use(
  (response) => {
    // if (response.data && response.data.code === 401) {
    //   // 401, token失效
    //   clearLoginInfo()
    //   router.push({ name: 'login' })
    // }
    return response.data // 返回响应数据 | 这里是测试demo就这样返回不解构了,最好是直接返回response
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      switch (error.response.status) {
        case 401:
          // 处理未授权错误

          Message({ message: '未授权', type: 'error' })
          break
        case 403:
          // 处理禁止访问错误

          Message({ message: '禁止访问', type: 'error' })
          break
        case 404:
          // 处理找不到资源错误

          Message({ message: '找不到资源', type: 'error' })
          break
        case 500:
          // 处理服务器内部错误

          Message({ message: '服务器内部错误', type: 'error' })
          break
        // 可以继续添加其他状态码的处理逻辑
      }
    } else {
      Message({ message: '请求失败', type: 'error' })
      // 处理其他类型的错误（如网络问题）
    }
    return Promise.reject(error)
  }
)

export default request
