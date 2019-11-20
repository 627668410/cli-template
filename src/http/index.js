import axios from 'axios'
import Vue from 'vue'
import baseURL from './url'
// const path = require('path')

// axios实例化
let http = axios.create({
  baseURL:process.env.NODE_ENV === 'development'?baseURL :process.env.VUE
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  timeout: 15 * 1000,
  // 默认status code: 200-300对应resolve
  // <500 then; >=500 catch
  validateStatus: (status) => {
    return status < 500
  }
})

// 自动切换HTTP/HTTPS
// development环境属于本机环境，本机环境用proxy做转发请求，勿设置http.defaults.baseURL，否则转发失效
// if (process.env.NODE_ENV !== 'development') {
//   if (window.location.protocol && window.location.protocol.startsWith('https:')) {
//     http.defaults.baseURL = process.env.VUE_APP_HTTPS_BASE_URL
//   } else {
//     http.defaults.baseURL = process.env.VUE_APP_HTTP_BASE_URL
//   }
// }

// 请求拦截器
http.interceptors.request.use((config) => {
  const reqConfig = {
    ...config
  }

  // 容错处理
  if (!reqConfig.url) {
    console.error('request need url')
    throw new Error({
      source: 'axiosInterceptors',
      message: 'request need url'
    })
  }
  // else {
  //   // 请求转发（参数中isMock=true时，被转发到mock API；参数中isMock=false或undefined时，被转发到后台API）
  //   // 转发请看vue.config.js中的devServer.proxy
  //   if (process.env.NODE_ENV === 'development') {
  //     if ((reqConfig.params && reqConfig.params.isMock) || (reqConfig.data && reqConfig.data.isMock)) {
  //       reqConfig.url = path.join('/mock', reqConfig.url)
  //     } else {
  //       reqConfig.url = path.join('/aiparking', reqConfig.url)
  //     }
  //   }
  // }

  // 默认get请求
  if (!reqConfig.method) {
    reqConfig.method = 'get'
  }

  // 大小写容错
  reqConfig.method = reqConfig.method.toLowerCase()

  // 参数容错
  if (reqConfig.method === 'get') {
    if (!reqConfig.params) {
      reqConfig.params = reqConfig.data || {}
    }
  } else if (reqConfig.method === 'post') {
    if (!reqConfig.data) {
      reqConfig.data = reqConfig.params || {}
    }

    // 检测是否包含文件类型，若包含则进行formdata封装
    let hasFile = false
    for (let key in reqConfig.data) {
      if (typeof reqConfig.data[key] === 'object') {
        if (reqConfig.data[key] instanceof FileList || reqConfig.data[key] instanceof File || reqConfig.data[key] instanceof Blob) {
          hasFile = true
        }
      }
    }

    // 检测到存在文件使用 FormData 提交数据
    if (hasFile) {
      const formData = new FormData()
      for (let key in reqConfig.data) {
        formData.append(key, JSON.stringify(reqConfig.data[key]))
      }
      reqConfig.data = formData
    }
  }

  // 设置token(自行配置)
  let token = ''
  reqConfig.headers.token = token

  return reqConfig
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
  let { status } = response
  let { message } = response.data
  if (status.toString().startsWith('2')) {
    return response.data
  }

  if (status === 400) {
    // 如有特殊处理，自行配置
    // ......
  }
  if (status === 401) {
    // 如有特殊处理，自行配置
    // ......
  }
  Vue.prototype.$message({
    message: message || '未知错误',
    type: 'error'
  })
  return Promise.reject(response)
}, (error) => {
  if (error.message.indexOf('timeout') !== -1) {
    Vue.prototype.$notify({
      title: 'Network Timeout',
      dangerouslyUseHTMLString: true,
      message: '<strong>请求超时</strong>'
    })
  } else {
    Vue.prototype.$notify({
      title: 'Server Error',
      dangerouslyUseHTMLString: true,
      message: '<strong>服务器内部异常</strong>'
    })
  }
  return Promise.reject(error)
})

export default http
