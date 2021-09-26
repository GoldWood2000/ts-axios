const toString = Object.prototype.toString

export function isDate<T>(val: T) {
  return toString.call(val) === '[object Date]'
}

export function isObject<T>(val: T) {
  return toString.call(val) === '[object Object]'
}

export function isArray<T>(val: T) {
  return toString.call(val) === '[object Array]'
}
