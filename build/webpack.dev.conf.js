const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: "js/[name].[hash:16].js",
    },

    resolve: {
        extensions: ['.js', '.jsx'], //后缀名自动补全,识别jsx文件需增加
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            minify: {
                html5: true
            },
            hash: false,
            favicon: 'app/assets/img/favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: '3000',
        contentBase: path.join(__dirname, '../public'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:2000', //设置调用接口域名和端口号别忘了加http
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
                    // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
                }
            }
        },
    }
});
