type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE'

export interface AxiosRequestConfig {
  url: string
  method: Methods
  headers?: any
  params?: any
  data?: any
}
