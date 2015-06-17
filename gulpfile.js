var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uncss = require('gulp-uncss');

gulp.task('server', function(){
  connect.server({
    livereload: true  
  });
});

gulp.task('js', function () {
  gulp.src('./public/dist/**/*.js')
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src('./public/src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('/public/dist/css'))
    .pipe(connect.reload());
});

gulp.task('browserify',function(){
  return browserify('./public/src/js/app.js', {
    transform: ['reactify']  
  }).bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/dist/js'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./public/src/js/*.js'],['browserify']);
  gulp.watch('./public/dist/js/*.js', ['js']);
  gulp.watch(['./public/src/scss/*.scss'],['sass']);
});

gulp.task('uncss', function() {
  return gulp.src('./public/css/lib/font-awesome.min.css')
    .pipe(uncss({
        html: ['index.html']
    }))
    .pipe(gulp.dest('./public/css/out'));
});

gulp.task('default', ['server','watch']);

