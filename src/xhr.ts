import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/index'
import { transformResponseHeader } from './utils/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  const { url, method = 'GET', data = null, headers, responseType } = config

  return new Promise(resolve => {
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)

    if (responseType) {
      request.responseType = responseType
    }

    request.onload = () => {
      if (request.status === 200) {
        const { response, status, statusText } = request
        const responseHeaders = transformResponseHeader(request.getAllResponseHeaders())

        const responseData: AxiosResponse = {
          data: request?.responseType !== 'text' ? response : request.responseText,
          status,
          statusText,
          headers: responseHeaders,
          config,
          request
        }
        resolve(responseData)
      }
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    try {
      request.send(data)
    } catch (error) {
      //
    }
  })
}
