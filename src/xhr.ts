import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'GET', data = null, headers } = config

  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
