const path = require('path')
function resolve(dir) {
  //此处使用path.resolve 或path.join 可自行调整
  return path.join(__dirname, dir)
}
const myTheme = resolve('src/common/vant-less/index.less')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            hack: `true; @import "${myTheme}";`
          }
        }
      }
    }
  }
}
