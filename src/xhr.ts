import { AxiosRequestConfig, AxiosResponse, AxiosPromise, AxiosError } from './types/index'
import { transformResponseHeader } from './utils/headers'
import { createError } from './utils/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  const { url, method = 'GET', data = null, headers, responseType, timeout } = config

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.onload = () => {
      if ((request.status >= 200 && request.status < 300) || request.status === 304) {
        const { response, status, statusText } = request
        const responseHeaders = transformResponseHeader(request.getAllResponseHeaders())

        const responseData: AxiosResponse = {
          data: request.responseType !== 'text' ? response : request.responseText,
          status,
          statusText,
          headers: responseHeaders,
          config,
          request
        }
        resolve(responseData)
      } else {
        let Error: AxiosError = {
          message: `Request failed with status code ${request.status}`,
          config,
          request
        }
        reject(createError(Error))
      }
    }

    request.onerror = () => {
      let Error: AxiosError = {
        message: 'Network Error',
        config,
        request
      }
      reject(createError(Error))
    }

    request.ontimeout = () => {
      let Error: AxiosError = {
        message: `Timeout of ${config.timeout} ms exceeded`,
        config,
        request
      }
      reject(createError(Error))
    }

    try {
      request.send(data)
    } catch (error) {
      throw error
    }
  })
}
