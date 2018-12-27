/**
 * @intro: gulp生产版配置.
 * @Date: 2018/12/24 11:03.
 *
 */
process.env.NODE_ENV = 'production'

require('./gulp.base.conf')
const gulp = require('gulp')
const runSequence = require('run-sequence').use(gulp)

// 构建整个项目
gulp.task('build', () => {
  runSequence('clean', 'config', 'styles', 'scripts', 'images', 'fonts', 'html')
})
