/**
 * @intro: gulp开发版配置.
 * @Date: 2018/12/24 9:51.
 *
 */
process.env.NODE_ENV = 'development'

require('./gulp.base.conf')
const gulp = require('gulp')
const runSequence = require('run-sequence').use(gulp)
const browserSync = require('browser-sync').create()
const {dev: {autoOpenBrowser, port, assetsRoot}} = require('../config')

const reload = browserSync.reload

//启动服务器
gulp.task('serve', () => {
  runSequence('clean', 'styles', 'scripts', 'images', 'fonts', 'html', () => {
    browserSync.init({
      open: autoOpenBrowser,
      notify: false,
      port: port,
      server: {
        baseDir: [assetsRoot]
      }
    })

    gulp.watch([
      'src/**/*.html',
      'src/static/images/**/*',
      '.tmp/static/fonts/**/*'
    ]).on('change', reload)

    gulp.watch('src/static/styles/**/*.scss', ['styles'])
    gulp.watch('src/static/scripts/**/*.js', ['scripts'])
    gulp.watch('src/static/fonts/**/*', ['fonts'])
  })
})
