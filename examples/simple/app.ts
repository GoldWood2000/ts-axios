import axios from '../../src/index'
import { AxiosRequestConfig } from '../../src/types/index'

// 原生XMLHttpRequest中get请求是没有请求体的并且是不会将参数绑定到url上的，即使send（）中传入参数也会被置为null，需要自己去对各种类型进行拼接实现,
const config: AxiosRequestConfig = {
  url: '/simple/get',
  method: 'get',
  params: {
    a: 1,
    b: 2
  }
}


// 在XHR请求中要发送的数据体. 可以是:
// 可以为 Document, 在这种情况下，它在发送之前被序列化.
// 为 XMLHttpRequestBodyInit, 从 per the Fetch spec （规范中）可以是 Blob, BufferSource (en-US), FormData, URLSearchParams, 或者 USVString 对象.
// null
// 平时axios中可以传入的对象也是因为被转为了USVString
const configPost: AxiosRequestConfig = {
  url: '/simple/post',
  method: 'post',
  data: {
    a: 1,
    b: 2
  }
}
axios(config)
axios(configPost)