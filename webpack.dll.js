const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    vendors: ['vue', 'vuex', 'vue-router', 'element-ui', 'axios']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, './dll'),
    library: '[name]' // 把文件里的内容通过全局变量暴露出来，变量的名字叫vendors
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]', // 对library这个库进行dllplugin的分析
      path: path.resolve(__dirname, './dll/[name].manifest.json')
    })
  ]
}
