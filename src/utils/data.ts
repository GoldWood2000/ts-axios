import { isObject } from './common'

export function transformRequest(data: any) {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
