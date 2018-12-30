const autoprefixer = require('gulp-autoprefixer');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');
const watch = require('gulp-watch');

// --- Default --- \\
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      open: false,
      port: 3500
    }));
});

gulp.task('prefixer', function() {
  return gulp.src('src/scss/styles.scss')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('src/scss/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass']);
});

// --- Dist --- \\
gulp.task('minify-css', function() {
  return gulp.src('src/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('minify-html', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series(['sass', 'prefixer', 'webserver', 'sass:watch']));
gulp.task('dist', gulp.series(['sass', 'minify-css', 'minify-html']));
