export const storage = (key, data) => {
  let headerStr = ''
  key += headerStr
  if (data) {
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
