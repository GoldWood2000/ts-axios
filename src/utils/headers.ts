import { isObject } from './common'

interface ResponseHeadersObject {
  [propName: string]: string
}

function normalizeHeaderName(headers: any, normalizedName: string) {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any) {
  normalizeHeaderName(headers, 'Content-Type')

  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function transformResponseHeader(headers: string) {
  if (!headers) {
    return {}
  }

  return headers
    .trim()
    .split('\r\n')
    .reduce((previousValue: ResponseHeadersObject, currentValue) => {
      const [key, value] = currentValue.trim().split(': ')
      // Object.defineProperty(previousValue, key, {
      //   value,
      //   writable: true
      // })
      previousValue[key] = value
      return previousValue
    }, {})
}
