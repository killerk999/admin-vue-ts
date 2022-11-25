export type Result = {
  code: string
  msg: string
}

// * 请求响应参数(包含data)
export type ResultData<T = any> = Result & {
  data: T
}

// * 登录模块

export type ReqLoginForm = {
  username: string
  password: string
}
export type ResLogin = {
  token: string
}
