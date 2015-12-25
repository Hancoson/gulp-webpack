/**
 * Created by Guoxing.han on 2015-11-16.
 */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
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
    removeLogs = require('gulp-removelogs'),//删除调试代码
// 静态文件打包合并
    webpack = require('gulp-webpack'),
    config = require('./webpack.config'),
    del = require('del');

// Environment setup 环境设置
var env = {
    production: false
};

// Environment task.
gulp.task("set-production", function () {
    env.production = true;
});


// HTML处理
gulp.task('html', function () {
    var htmlSrc = 'src/*.html',
        htmlDst = 'dist';

    gulp.src(htmlSrc)
        .pipe(livereload())
        .pipe(gulp.dest(htmlDst))
});

// Styles
gulp.task('styles', function () {
    var processors = {
        src         : 'src/styles/*.scss',
        dist        : 'dist/styles',
        autoprefixer: autoprefixer({
            browsers: ['last 2 versions'],
            cascade : true, //是否美化属性值 默认：true
            remove  : true //是否去掉不必要的前缀 默认：true
        })
    };
    if (env.production) {
        //生成版本
        return gulp.src(processors.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(processors.autoprefixer)
            .pipe(minifycss())
            .pipe(gulp.dest(processors.dist))
            .pipe(livereload());
    }
    else {
        //开发版本
        return gulp.src(processors.src)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(processors.autoprefixer)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(processors.dist))
            .pipe(livereload());
    }
});

//copy
gulp.task('copy', function () {
    gulp.src(['./src/scripts/lib/**/dist/jquery.min.js', './src/scripts/lib/**/dist/jquery.min.map'])
        .pipe(gulp.dest('dist/scripts/lib'));
    gulp.src(['./src/_json/*'])
        .pipe(gulp.dest('dist/_json'))
});
// Scripts
gulp.task('lint', function () {
    gulp.src(['src/scripts/*.js', 'src/scripts/lib/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('scripts', function () {
    var path = {
        src : 'src/scripts/lib/*.js',
        dist: 'dist/scripts/lib'
    };
    if (env.production) {
        //生产版本
        console.log('release');
        return gulp.src(path.src)
            .pipe(removeLogs())
            .pipe(uglify())
            .pipe(gulp.dest(path.dist))
    }
    else {
        //开发版本
        console.log('dev');
        return gulp.src(path.src)
            .pipe(jshint.reporter('default'))
            .pipe(gulp.dest(path.dist))
    }
});
gulp.task('webpack', function () {
    var path = {
        src : './src/scripts/*.js',
        dist: './dist/scripts'
    };

    if (env.production) {
        //生产版本
        return gulp.src(path.src)
            .pipe(webpack(config))
            .pipe(removeLogs())
            .pipe(uglify())
            .pipe(gulp.dest(path.dist));
    }
    else {
        //开发版本
        return gulp.src(path.src)
            .pipe(webpack(config))
            .pipe(gulp.dest(path.dist));
    }
});
// Images
gulp.task('images', function () {
    return gulp.src('src/images/**')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('dist/images'));
});

// Clean
gulp.task('clean', function () {
    return del(['dist/styles', 'dist/scripts', 'dist/images']);
});

// dev task  开发环境
gulp.task('dev', ['clean'], function () {
    gulp.start('html', 'styles', 'images', 'copy', 'lint', 'scripts', 'webpack');
});

//release task 发布版本
gulp.task('release', ["set-production", 'clean'], function () {
    gulp.start('html', 'styles', 'images', 'copy', 'lint', 'scripts', 'webpack');
});

//watch
gulp.task('watch', function () {
    livereload.listen(); //要在这里调用listen()方法

    gulp.watch('*.html', function (event) {
        gulp.run('html');
    });
    gulp.watch('src/styles/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/*.js', ['webpack']);

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});