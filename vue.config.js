const path = require('path')
const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const packageConfig = require('./package.json')
const fs = require('fs')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// 不同环境打包到不同文件夹下
let outputDirName = `dist/${packageConfig.name}`
switch (process.env.NODE_ENV) {
  case 'dev':
    outputDirName += `_dev_${packageConfig.version}`
    break
  case 'test':
    outputDirName += `_test_${packageConfig.version}`
    break
  case 'production':
    outputDirName += `_prod_${packageConfig.version}`
    break
}

module.exports = {
  publicPath: './',
  outputDir: outputDirName,
  assetsDir: 'static',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  chainWebpack(config) {
    // webpack dllplugin
    if (process.env.NODE_ENV === 'development') {
      const files = fs.readdirSync(path.resolve(__dirname, './dll'))
      files.forEach((file, index) => {
        if (/.*\.dll.js/.test(file)) {
          config.plugin('AddAssetHtmlWebpackPlugin' + index).use(require('add-asset-html-webpack-plugin'), [{
            filepath: path.resolve(__dirname, 'dll', file)
          }])
        }
        if (/.*\.manifest.json/.test(file)) {
          config.plugin('DllReferencePlugin' + index).use(require('webpack/lib/DllReferencePlugin'), [{
            context: __dirname,
            manifest: path.resolve(__dirname, 'dll', file)
          }])
        }
      })
    }
    // js统一打包到js文件夹下
    config.output.filename('static/js/[name].js')
    // 删除预加载
    if (process.env.NODE_ENV !== 'development') {
      config.plugins.delete('preload') // TODO: need test
      config.plugins.delete('prefetch')
    }
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // moment 中文包
    config.plugin('moment').use(new ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/))
    if (process.env.VUE_APP_IS_ANALYZ === 'true') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    // 压缩
    if (process.env.VUE_APP_IS_COMPRESS === 'true') {
      config.plugin('compression').use(require('compression-webpack-plugin'), [{
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: true
      }])
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'development') {
      config.plugins.push(
        new UglifyJsPlugin({
          // 删除debugger和console
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          exclude: /\/chunk-vendors/,
          // 多进程并行来提高构建速度
          parallel: true
        })
      )
    }
  }
}
