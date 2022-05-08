/**
 * @Description: Vue 配置
 * @Author: Zander
 * @Date: 2022/5/6 16:23
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 16:23
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 导出API代理
function getProxyObj() {
  let ret = {}, list;
  if (process.env.VUE_APP_PROXY) {
    try {
      list = JSON.parse(process.env.VUE_APP_PROXY.replace(/'/g, '"'));
    } catch (e) {
      list = '';
      ret = null;
    }
  } else {
    list = '';
    ret = null;
  }
  for (const [prefix, target] of list) {
    const isHttps = /^https:\/\//.test(target);
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      pathRewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {})
    }
  }
  return ret;
}

// gzip压缩插件
const CompressionPlugin = require('compression-webpack-plugin');

// css压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 是否为开发环境
const isDev = process.env.VUE_APP_MODE === 'dev';

// 时间戳解决部署缓存问题
const Timestamp = new Date().getTime();

// 网页标题
const name = process.env.VUE_APP_TITLE || 'Zander-Admin'

// 端口
const port = process.env.port || process.env.npm_config_port || 80

// vue.config.js 配置说明
// 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
module.exports = {
  // 使用带有浏览器内编译器的完整构建版本,是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // baseUrl: '/',//vue-cli3.3以下版本使用
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // vue-cli3.3+新版本使用
  // 构建好的文件输出到哪里
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: isDev,
  // 以多页模式构建应用程序。
  pages: {
    views: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: name
    }
  },
  // 构建时开启多进程处理 babel 编译
  // 是否为 Babel 或 TypeScript 使用 thread-loader。
  // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  // see https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@api': resolve('src/api'),
        '@views': resolve('src/views'),
        '@utils': resolve('src/utils'),
        '@components': resolve('src/components'),
        '@formDesigner': resolve('src/views/formDesigner') // 表单设计器
      }
    },
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip', // 开启gzip
        test: /\.js$|\.html$|\.scss$|\.css$/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        minRatio: 0.8,
        cache: !isDev, // 是否需要缓存
        deleteOriginalAssets: false // 不删除源文件
      }),
      // 修改打包后css文件名
      new MiniCssExtractPlugin({
        filename: `static/css/[name].${Timestamp}.css`,
        chunkFilename: `static/css/[name].${Timestamp}.css`
      })
    ],
    // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
    output: {
      filename: `static/js/[name].${Timestamp}.js`,
      chunkFilename: `static/js/[name].${Timestamp}.js`
    }
  },
  // 调整内部的webpack配置.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
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
      .end();

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  },
  // 第三方插件配置
  pluginOptions: {},
  // 开发环境配置
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    host: '127.0.0.1',
    port: port,
    proxy: getProxyObj(),
    open: true,
    progress: true,
    disableHostCheck: true
  }
}
