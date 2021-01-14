// 获取随机数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 获取UUID
export function generateUUID() {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

// 打乱数组顺序
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 延迟执行方法
export function debounce(func, delay) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/*
 * 使用脚本方式，拨打电话
 *
 */
export class CallPhoneMethods {
  static tag(phone) {
    let a = document.createElement('a')
    let event = new MouseEvent('click')
    a.href = `tel:${phone}`
    a.dispatchEvent(event)
  }
  static script(phone) {
    window.location.href = `tel:${phone}`
  }
}

function compare(key, order = 1) {
  return function(a, b) {
    let v1 = a[key]
    let v2 = b[key]
    if (v1 < v2) {
      return order
    } else if (v1 > v2) {
      return -order
    } else {
      return 0
    }
  }
}

// 根据 `key` 进行排序，
// `order` 默认: 倒序 10 9 ... 1
export function sortByKey(array, key, order = 1) {
  return array.sort(compare(key, order))
}

// 等待指定时间后执行
export function waiting(offset = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, offset)
  })
}

export const pauseAllMedia = function(env) {
  if (!env.includes('nativeAPP')) return false
  // 解决安卓在进入多媒体，在进入其他的H5页面， 还会播音乐的bug
  let allaudio = document.querySelectorAll('audio')
  let allvideo = document.querySelectorAll('video')
  for (let j = 0; j < allaudio.length; j++) {
    allaudio[j] && allaudio[j].pause()
  }
  for (let i = 0; i < allvideo.length; i++) {
    allaudio[i] && allaudio[i].pause()
  }
}

// expiretime：Number
export const expireTimeChangeFun = expiretime => {
  let endtime = new Date(String(new Date(expiretime)).split(' ')[0])
  let starttime = new Date(String(new Date()).split(' ')[0])
  let time = endtime - starttime
  let diffDay = 0
  let isExpire = false
  if (time < 0) isExpire = true
  // 相差天数
  diffDay = Math.floor(time / (1000 * 60 * 60 * 24))
  return {
    isExpire,
    diffDay
  }
}

export const GetQueryString = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg) // 获取url中"?"符后的字符串并正则匹配
  var context = ''
  if (r != null) {
    context = r[2]
  }
  reg = null
  r = null
  return context == null || context == '' || context == 'undefined'
    ? ''
    : context
}

// 千分位分割
export const numFormat = num => {
  var c = num.toString().includes('.')
    ? num.toLocaleString()
    : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return c
}

export const parseQuery = url => {
  let o = {}
  let queryString = url.split('?')[1]
  if (queryString) {
    queryString.split('&').forEach(item => {
      let [key, val] = item.split('=')
      val = val ? decodeURI(val) : true
      // 转码 无值赋值true
      // eslint-disable-next-line no-prototype-builtins
      if (o.hasOwnProperty(key)) {
        // 已有属性转为数组
        o[key] = [].concat(o[key], val)
      } else {
        o[key] = val
      }
    })
  }
  return o
}
