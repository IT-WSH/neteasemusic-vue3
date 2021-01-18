export const storage = (key, data) => {
  let headerStr = ''
  key += headerStr
  if (data != undefined && data != 'undefined') {
    // 设置数据
    let datas = { value: data }
    localStorage.setItem(key, JSON.stringify(datas))
    return false
  }
  let result = null
  let resultStr = ''
  try {
    resultStr = localStorage.getItem(key)
    if (resultStr) {
      result = JSON.parse(resultStr).value
    } else {
      result = null
    }
  } catch (error) {
    console.log('获取本地缓存解析失败', error)
  }
  return result
}
// session 存取数据
export const storageSession = (key, data) => {
  let headerStr = ''
  key += headerStr
  if (data != undefined && data != 'undefined') {
    // 设置数据
    let datas = { value: data }
    sessionStorage.setItem(key, JSON.stringify(datas))
    return false
  }
  let result = null
  let resultStr = ''
  try {
    resultStr = sessionStorage.getItem(key)
    if (resultStr) {
      result = JSON.parse(resultStr).value
    } else {
      result = null
    }
  } catch (error) {
    console.log('获取本地缓存解析失败', error)
  }
  return result
}
