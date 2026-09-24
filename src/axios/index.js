/*
 * @Author: wangyu
 * @Date: 2024-11-19 14:08:55
 * @LastEditTime: 2024-12-16 11:37:52
 * @LastEditors: wangyu
 * @Description:
 * @FilePath: \PreciseCultivationFront\src\axios\index.js
 */
import axios from 'axios'

const goLogin = () => {
  localStorage.clear()
  let LoginURL = import.meta.env.VITE_APP_LOGIN_URL
  window.location.href = LoginURL
}
const service = axios.create({
  // 记得去配 .env.development 文件中的 VITE_APP_BASE_URL
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 如果需要验证 uat，写在这里...
    // let TOKEN = localStorage.getItem("token");
    // if (!config.headers.noAuth && !TOKEN) {
    //   goLogin();
    // }
    // config.headers["Authorization"] = TOKEN;
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 如果401， 跳转登陆
    // if (response.data.code === 401) {
    //   goLogin()
    // }
    return response
  },
  (error) => {
    console.log('网络连接异常,请稍后再试!')
  }
)

/**
 * @param {*} url 接口地址
 * @param {*} type 常用 POST / GET
 * @param {*} params 参数
 * @param {*} headers 请求头，Content-Type 默认 application/application/json;charset=UTF-8
 *
 */
const request = (url, type, params, headers) => {
  //设置 url params type 的默认值
  return new Promise((resolve, reject) => {
    let promise
    if (type.toUpperCase() === 'GET') {
      promise = service({
        url,
        params,
        headers
      })
    } else if (type.toUpperCase() === 'POST') {
      promise = service({
        method: 'POST',
        url,
        data: params,
        headers
      })
    }

    //处理返回
    promise
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export { service, request }
