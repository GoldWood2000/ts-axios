import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { bulidURL } from './utils/url'
import { transformRequest } from './utils/data'
import { processHeaders } from './utils/headers'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return bulidURL(url, params)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

export default axios
