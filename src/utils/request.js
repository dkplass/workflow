import axios from 'axios'
import { toastMsg } from './toastMsg'

const errorHandle = (status, msg) => {
  switch (status) {
    case 400:
      // 登入失敗
      toastMsg(msg)
      break
    case 401:
      // 未登入或認證過期
      toastMsg(msg)
      break
    case 403:
      // 權限不足
      toastMsg(msg)
      break
    case 404:
      // 請求失敗
      toastMsg(msg)
      break
    default:
      // 為定義錯誤
      toastMsg('response 沒有定義的錯誤碼' + msg)
  }
}

// create an axios instance
const service = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_API}`,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response.data,
  error => {
    // API should handle error and response
    console.log('err' + error) // for debug
    errorHandle(0, error)
    return Promise.reject(error)
  }
)

export default service
