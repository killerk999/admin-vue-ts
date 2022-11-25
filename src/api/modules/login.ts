import http from '@/api'
import { ResLogin } from '../interface'

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: any) => {
  return http.post<ResLogin>(`/login`, params, { headers: { noLoading: true } }) // 正常 post json 请求  ==>  application/json
}
