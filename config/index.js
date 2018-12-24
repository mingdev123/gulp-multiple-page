/**
 * @intro: 配置文件.
 * @Date: 2018/12/24 12:52.
 *
 */
module.exports = {
  dev: {
    // Paths
    assetsRoot: '.tmp',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

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
    assetsPublicPath: '/',

    /**
     * 设置资源根目录
     * npm run build --path=/qubei-h5/bug/
     */
    basePath: process.env.npm_config_path
  }
}
