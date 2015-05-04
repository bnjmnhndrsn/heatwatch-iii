var gulp = require('gulp');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build:vendor', function() {
  return gulp.src(mainBowerFiles())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:app', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    debug: true,
    // defining transforms here will avoid crashing your stream		
  });

  return b.add('./app/app.js')
  	.bundle()
  	.pipe(source('app.js'))
    .pipe(gulp.dest('./dist/'));
});