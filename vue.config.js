/*
 * @Author: luckyNwa
 * @Date: 2023-04-17 15:14:06
 */

'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = process.env.VUE_APP_TITLE || '管理系统' // 生产环境才有效果
const port = process.env.port || process.env.npm_config_port || 8889 // 端口

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'static', //打包配置文件
  parallel: false,
  publicPath: './',

  devServer: {
    port: port,
    open: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_TARGET,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  chainWebpack(config) {
    config.module
      .rule('excel')
      .test(/\.(xls|xlsx)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[ext]',
      })
      .end()
  },
})
