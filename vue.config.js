'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 9527 // TODO: change to Settings
const appName = 'taiji-spring-cloud-platform-ui'

module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#baseurl
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'public',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/taiji*': {
        // target: `http://localhost:${port}/mock`,
        target: 'http://39.96.35.228:25000',
        changeOrigin: true,
        pathRewrite: {
          '^/' : '/'
        }
      },
      '/data-pipeline-core-zy/*': {
        // target: `http://localhost:${port}/mock`,
        target: 'http://39.96.35.228:25000',
        changeOrigin: true,
        pathRewrite: {
          '^/' : '/'
        }
      }
    }
  },
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appName,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
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
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/theme/element-variables.scss";`
      }
    }
  }
}
