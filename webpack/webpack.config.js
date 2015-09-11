var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ReloadPlugin = require('webpack-reload-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    //插件项
    plugins: [
        commonsPlugin, 
        new ExtractTextPlugin("[name].css"),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./','*.html'] }
        })
        // new ReloadPlugin("192.168.23.3")
    ],
    //页面入口文件配置
    entry: {
        // index : ['./index.js'],
        index : ['./index.js']
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/page/',
        // publicPath: "/js/page",
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            // { test: /\.js$/, loader: 'jsx-loader?harmony' },
            // { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!' +
                    'sass?sourceMap')},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};