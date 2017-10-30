'use strict'
//检查 node 和 npm 的版本
require('./check-versions')()

//获取配置
const config = require('../config')

//如果node的环境变量中没有设置当前的环境，则使用 config中的配置作为
//当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
//一个可以调用默认软件打开网址、图片、文件等内容的插件
//这里用它来调用默认浏览器打开 dev-server 监听的端口
const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')

//一个express中间件，用于将 http 请求代理到其他服务器
const proxyMiddleware = require('http-proxy-middleware')
//根据node环境来引入相应的 webpack 配置
const webpackConfig = require('./webpack.dev.conf')

//dev-server 监听的端口，默认为config.dev.port设置的端口，即8080
// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port


// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser

//定义 HTTP 代理表，代理到 API 服务器
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

//创建一个express实例
const app = express()

//mock json
// const router = express.Router()
// const goodsData = require('./../mock/goods.json')
// router.get('/goods',function(req,res,next){
//   res.json(goodsData)
// })
// app.use(router)

//根据webpack配置文件创建Compiler对象
const compiler = webpack(webpackConfig)

//webpack-dev-middleware 使用 compiler对象来对相应的文件进行编译和绑定
//编译绑定后将得到的产物存放在内存中二没有写进磁盘
//将这个中间件交给 express 使用之后即可访问这些编译后的产品文件
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

//webpak-hot-middleware 用于实现热重载功能的中间件
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

//将热重载中间件挂载到 express 服务器上
// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

//将 proxyTable 中的代理请求配置挂载到 express 服务器上
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  //格式化 options，例如将 'www.example.com'变成{target:'www.example.com'}
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

//重定向不存在的 URL ，常用于 SPA
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

//静态资源路径
// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
