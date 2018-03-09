import axios from 'axios'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'

axios.defaults.baseURL = 'http://cangdu.org:8001'
// 带cookie请求
axios.defaults.withCredentials = true
// 设置默认请求头
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.timeout = 5000

// 路由请求拦截
axios.interceptors.request.use(config => {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  return config
}, error => {
  Toast({
    message: '网络不佳',
    duration: 2000
  })
  return Promise.reject(error)
})

// 路由响应拦截
axios.interceptors.response.use(data => {
  Indicator.close()
  return data
}, error => {
  Toast({
    message: '网络不佳',
    duration: 2000
  })
  return Promise.reject(error)
})

export function http (params = {}) {
  return axios(params)
}
