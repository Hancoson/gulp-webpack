var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
//var UglifyJsPlugin = require("./node_modules/webpack/lib/optimize/UglifyJsPlugin");

 var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //插件项
    plugins: [
        commonsPlugin,
        //独立打包样式文件
        new ExtractTextPlugin("src/styles.css")
        //使用丑化js插件
//        new UglifyJsPlugin({
//            compress: {
//                warnings: false
//            },
//            mangle: {
//                except: ['$scope', '$']
//            }
//        })
    ],

    entry: {
        m1:'./src/m1.js',
        m2:'./src/m2.js',
        //css:'./src/style.css'
    },
    output: {
        path: "dist",
        filename: '[name].bundle.js'
    },
    watch: true,
    //module: {
        //加载器配置
        loaders: [
            //独立打包样式文件
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
            //{test: /\.css$/,loader: 'style!css'},
            //{ test: /\.js$/, loader: 'jsx-loader?harmony' },
        ]
    //}
    
};