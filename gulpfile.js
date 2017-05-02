var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('scss', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(prefix())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// Launch BrowserSync server
gulp.task('serve', ['scss'], function(cb) {

  browserSync.init({
    notify: true,
    server: '.'
  });

  gulp.watch('scss/*.scss', ['scss']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
