/*
 * @Descripttion:
 * @version: 1.0
 * @Author: pei qi wu
 * @Date: 2020-04-30 16:27:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-18 02:27:25
 */

// 压缩base64
export const compressedImage = params => {
  let initParams = {
    src: params.src,
    quality: params.quality || 1
  }

  let image = new Image()
  image.src = initParams.src
  image.onload = function() {
    // 获取图片初始宽高
    let width = image.width
    let height = image.height
    // 判断图片宽度，再按比例设置宽度和高度的值
    if (width > 1024) {
      width = 1024
      height = Math.ceil(1024 * (image.height / image.width))
    }

    // 将图片重新画入canvas中
    let canvas = document.createElement('canvas') // 创建canvas标签
    canvas.id = 'compressCanvas'
    canvas.style.position = 'fixed'
    canvas.style.zIndex = '-1'
    canvas.style.opacity = '0'
    canvas.style.top = '-100%'
    canvas.style.left = '-100%'

    let context = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    context.beginPath()
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)
    context.fill()
    context.closePath()
    context.drawImage(image, 0, 0, width, height)
    let replaceSrc = canvas.toDataURL('image/jpeg', initParams.quality)
    params.success && params.success(replaceSrc)
    canvas.remove()
  }
}

// 将base64转化为
export const dataURItoBlob = dataURI => {
  let mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]
  let buffer = dataURItoBuffer(dataURI)
  return new Blob([buffer], { type: mimeString })
}

export const dataURItoBuffer = dataURI => {
  let base64 = dataURI.substring(dataURI.indexOf(',') + 1)
  let byteString = atob(base64)
  let buffer = new ArrayBuffer(byteString.length)
  let view = new Uint8Array(buffer)

  for (let i = 0; i < byteString.length; i++) {
    view[i] = byteString.charCodeAt(i)
  }
  return buffer
}
