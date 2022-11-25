import { useGlobalStore } from '@/stores'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { AxiosCanceler } from './helper/axiosCancel'
import { ResultData } from './interface'

// 取消重复请求实例
const axiosCanceler = new AxiosCanceler()

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间（10s）
  timeout: 5000,
  // 跨域时候允许携带凭证s
  withCredentials: true,
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */

    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const globalStore = useGlobalStore()

        // * 将当前请求添加到 pending 中
        axiosCanceler.addPending(config)

        const token = localStorage.getItem('token')
        return { ...config, headers: { ...config.headers, Authorization: token } }
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response
        // * 在请求结束后，移除本次请求，并关闭请求 loading
        axiosCanceler.removePending(config)
        console.log(response, data)
        if (response.status === 200 || response.status === 201) {
          return data
        } else {
          ElMessage.error(data.meg)
          return Promise.reject(new Error(data.meg))
        }
      },
      error => {
        error.response && ElMessage.error(error.response.data)
        return Promise.reject(new Error(error.response.data))
      }
    )
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
}
export default new RequestHttp(config)
