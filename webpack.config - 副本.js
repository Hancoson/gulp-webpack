var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './src/js/main.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/js',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
            /*
            * 如上，"-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。
            */
        ]
    },
    //其它解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        root: 'E:/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};

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