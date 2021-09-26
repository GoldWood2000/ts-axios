import { AxiosRequestConfig, AxiosResponse, AxiosError } from '../types/index'

class AxiosErrorHandle {
  message: string
  config: AxiosRequestConfig
  isAxiosError: boolean
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(errorConfig: AxiosError) {
    this.message = errorConfig.message
    this.config = errorConfig.config
    this.code = errorConfig.code
    this.request = errorConfig.request
    this.response = errorConfig.response
    this.isAxiosError = true
  }
}

export function createError(errorConfig: AxiosError) {
  const error = new AxiosErrorHandle(errorConfig)
  return error
}
