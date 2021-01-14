// 是否有类名
export function hasClass(el, className) {
  return el.classList && el.classList.length
    ? el.classList.contains(className)
    : false
}

// 添加类名
export function addClass(el, className) {
  if (el) el.classList.add(className)
}

// 移除类名
export function removeClass(el, className) {
  if (el) el.classList.remove(className)
}

// 获取或设置标签属性
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

// 获取当前环境所需样式前缀
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
