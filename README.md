# gulp-webpack
##gulp &amp; webpack 工程化管理<br>
###1.livereload  实时自动刷新页面来开发

- 第一步：全局安装gulp 和 当前目录部署 gulp 和 gulp-livereload

```js

npm install gulp -g

npm install gulp gulp-livereload --save-dev

```

- 第二步：安装 chrome 插件 LiveReload

- 第三步： 命令行下运行

```js

gulp watch

```

- 第四步： 运行http-server（dist目录）,以服务器的方式打开页面，例如 localhost:8080

###2.webpack  实时自动刷新页面来开发

```js

gulp-livereload

```
###3.模块化开发

###4.公共文件打包到同一文件中

###5.开发环境```gulp dev```与生产环境```gulp release```分离开
