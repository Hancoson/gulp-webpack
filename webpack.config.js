/**
 * Created by Guoxing.han on 2015-11-16.
 */
'use strict';

//path: 打包文件存放的绝对路径
//publicPath: 网站运行时的访问路径
//filename: 打包后的文件名
var path = require("path");

var lib_dir = __dirname + '/src/scripts/lib';

var CommonsChunkPlugin = require("./node_modules/webpack/lib/optimize/CommonsChunkPlugin"); //将多个打包后的资源中的公共部分打包成单独的文件
var ProvidePlugin = require("./node_modules/webpack/lib/ProvidePlugin"); //

module.exports = {
    entry  : {
        p2: './src/scripts/p2.js',
        p1: './src/scripts/p1.js',
        p3: './src/scripts/p3.js'
    },
    output : {
        filename: '[name].js'
    },
    resolve: {
        alias: {
            jquery:lib_dir+ "/jquery/dist/jquery.js"
        }
    },
    plugins: [
        new ProvidePlugin({
            $     : "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new CommonsChunkPlugin("common.js", 2) //文件被引用两次就打包到common.js文件中
    ]
};