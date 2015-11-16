/**
 * Created by Guoxing.han on 2015-11-16.
 */
'use strict';

var gulp = require('gulp'),
//sass = require('gulp-ruby-sass'),
    less = require("gulp-less"),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'), //图片缓存，只有图片替换了才压缩
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    sourcemaps = require('gulp-sourcemaps'),
    replace = require('gulp-replace'),//文本替换
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'), //自动刷新
//clean = require('gulp-clean'),
// 静态文件打包合并
    webpack = require('gulp-webpack'),
    config = require('./webpack.config'),
    del = require('del');


// Styles
gulp.task('styles', function () {
    return gulp.src('src/styles/*.less', {style: 'expanded'})
        .pipe(less())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(livereload())
        .pipe(notify({message: 'Styles task complete'}));
});
// Scripts
gulp.task('scripts', function () {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint.reporter('default'))
        //.pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(sourcemaps.write(''))
        .pipe(notify({message: 'Scripts task complete'}));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/images/**')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function () {
    return del(['dist/styles', 'dist/scripts', 'dist/images']);
});

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts','images');
});

//watch
gulp.task('watch', function () {
    livereload.listen(); //要在这里调用listen()方法

    gulp.watch('src/styles/*.less', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/*.js', ['scripts']);

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});