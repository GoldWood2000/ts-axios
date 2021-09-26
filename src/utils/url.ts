import { isDate, isObject, isArray } from './common'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL(url: string, params?: any) {
  if (!params) {
    return url
  }

  if (!isObject(params)) {
    throw new Error('params Should be a Object')
  }

  const parts: string[] = []
  Object.keys(params).forEach(key => {
    if (params[key] === null || params[key] === undefined) return
    let val: string = ''
    switch (true) {
      case isArray(params[key]):
        ;(params[key] as []).map((item, index) => {
          if (item === null || item === undefined) return
          val = `${key}[]=${item}`
          !(index === (params[key] as []).length - 1) && parts.push(val)
        })
        break
      case isDate(params[key]):
        val += `${key}=${(params[key] as Date).toISOString()}`
        break
      case isObject(params[key]):
        val += `${key}=${encode(JSON.stringify(params[key]))}`
        break
      default:
        val += `${key}=${params[key]}`
        break
    }
    parts.push(val)
  })

  console.log(parts)

  let serializedParams = parts.join('&')
  if (serializedParams) {
    url.indexOf('#') !== -1 && (url = url.slice(0, url.indexOf('#')))
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

// export function bulidURL(url: string, params?: any) {
//   if (!params) {
//     return url
//   }

//   const parts: string[] = []

//   Object.keys(params).forEach((key) => {
//     let val = params[key]
//     if (val === null || typeof val === 'undefined') {
//       return
//     }
//     let values: string[]
//     if (Array.isArray(val)) {
//       values = val
//       key += '[]'
//     } else {
//       values = [val]
//     }
//     values.forEach((val) => {
//       if (isDate(val)) {
//         val = val.toISOString()
//       } else if (isObject(val)) {
//         val = JSON.stringify(val)
//       }
//       parts.push(`${encode(key)}=${encode(val)}`)
//     })
//   })

//   console.log(parts);

//   let serializedParams = parts.join('&')
//   if (serializedParams) {
//     const markIndex = url.indexOf('#')
//     if (markIndex !== -1) {
//       url = url.slice(0, markIndex)
//     }

//     url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
//   }

//   return url
// }
