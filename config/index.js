/**
 * @intro: 配置文件.
 * @Date: 2018/12/24 12:52.
 *
 */
const proxyMiddleware = require('http-proxy-middleware')

module.exports = {
  dev: {
    // Paths
    assetsRoot: '.tmp',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    /**
     * 使用http-proxy-middleware配置
     * eg: proxyMiddleware(['/users'], {target: 'https://www.baidu.com', changeOrigin: true})
     *
     */
    proxyTable: null,

    port: 5001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true
  },
  build: {
    // Paths
    assetsRoot: 'dist',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/qubei-h5/',

    /**
     * 设置资源根目录
     * npm run build --path=/qubei-h5/bug/
     */
    basePath: process.env.npm_config_path,
    /**
     * 设置环境
     * npm run build --env=test
     */
    envName: process.env.npm_config_env || 'test'
  },
  env: {
    //测试环境配置
    test: {
      baseApi: 'https://www.baidu.com'
    }
  }
}
