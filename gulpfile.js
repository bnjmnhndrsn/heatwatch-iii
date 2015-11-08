'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function() {
    return browserify({
            entries: './src/app.jsx',
            extensions: ['.jsx'],
            debug: true,
        })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function(){
    return gulp.src(['./assets/sass/app.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            precision: 10
        }))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('watch', function() {
    gulp.watch(['./src/**/*.jsx'], ['build', browserSync.reload]);
});

gulp.task('serve', ['build'], function(){
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false,
        browser: ["google chrome"]
    });
});

gulp.task('dev', ['serve','watch']);
