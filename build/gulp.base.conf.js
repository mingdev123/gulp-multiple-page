/**
 * @intro: gulp打包基类.
 * @Date: 2018/12/24 9:30.
 *
 */
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const reload = require('browser-sync').create().reload
const del = require('del')
const vinylPaths = require('vinyl-paths')
const {dev, build} = require('../config')

const NODE_ENV = process.env.NODE_ENV || 'development'
const isDevelopment = NODE_ENV === 'development'
const dest = (dir = '') => isDevelopment ? gulp.dest(`${dev.assetsRoot}${dir}`) : gulp.dest(`${build.assetsRoot}${dir}`)
const assetsDest = (dir = '') => isDevelopment ? dest(`/${dev.assetsSubDirectory}${dir}`) : dest(`/${build.assetsSubDirectory}${dir}`)

// 样式处理
gulp.task('styles', () => {
  return gulp
    .src('src/static/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync())
    .pipe($.postcss())
    .pipe(assetsDest('/styles'))
    .pipe(reload({stream: true}))
})

// js处理
gulp.task('scripts', () => {
  return gulp
    .src('src/static/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.if(dev.useEslint, $.eslint()))
    .pipe($.babel())
    .pipe(assetsDest('/scripts'))
    .pipe(reload({stream: true}))
})

// 图片处理
gulp.task('images', () => {
  return gulp
    .src('src/static/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(assetsDest('/images'))
})

// 字体处理
gulp.task('fonts', () => {
  return gulp
    .src('src/static/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(assetsDest('/fonts'))
})

// html
gulp.task('html', () => {
  return gulp
    .src('src/**/*.html')
    .pipe($.useref({
      searchPath: [isDevelopment ? dev.assetsRoot : build.assetsRoot, '.'],
      transformTargetPath: path => {
        const nowDate = Date.now()
        const transPath = p => {
          let basePath = p
          if (basePath.lastIndexOf('/') !== basePath.length - 1) {
            basePath += '/'
          }
          return basePath
        }
        if (path.indexOf('/') === 0) {
          path = path.substr(1)
        }
        if (isDevelopment) {
          return transPath(dev.assetsPublicPath) + path
        } else if (build.basePath) {
          return `${transPath(build.basePath)}${path}?t=${nowDate}`
        } else {
          return `${transPath(build.assetsPublicPath)}${path}?t=${nowDate}`
        }
      }
    }, () => vinylPaths(filePath => {
      //删除掉合并前的js和css,避免删除其他的，所以加个判断

      const assetsRoot = isDevelopment ? dev.assetsRoot : build.assetsRoot
      const basePath = require('path').join(__dirname, '..', assetsRoot)

      return filePath.indexOf(basePath) >= 0 ? del(filePath) : Promise.resolve()
    })))
    .pipe($.if(!isDevelopment, $.if(/\.js$/, $.uglify({compress: {drop_console: true}}))))
    .pipe($.if(!isDevelopment, $.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false}))))
    .pipe($.if(!isDevelopment, $.if(/\.html$/, $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: {compress: {drop_console: true}},
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))))
    .pipe(dest('/'))
})

gulp.task('clean', del.bind(null, [$.if(isDevelopment, dev.assetsRoot, build.assetsRoot)]))
