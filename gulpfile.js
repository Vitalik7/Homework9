const gulp = require('gulp')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const minifyCss = require('gulp-minify-css')
const sourcemaps = require('gulp-sourcemaps')
const babelify = require('babelify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const plumber = require('gulp-plumber')
const uglify = require('gulp-uglify')

gulp.task('default', ['styles', 'scripts'])

gulp.task('build', ['styles', 'scripts'])


gulp.task('styles', (done) => {
  gulp.src('./src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .on('end', done)
})

gulp.task('scripts', () => {
  return browserify('./src/scripts/main.js')
    .transform(babelify.configure({
      presets: ['es2015']
    }))
    .bundle()
    .pipe(source('./src/scripts/main.js'))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
})


gulp.task('watch', ['default'], () => {
  gulp.watch(['./src/styles/**/*.scss'], ['styles'])
  gulp.watch(['.src/scripts/**/*.js'], ['scripts'])
})