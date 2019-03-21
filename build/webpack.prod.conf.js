const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        filename: "js/[name].[chunkhash:16].js",
    },




    resolve: {
        extensions: ['.js', '.jsx'], //后缀名自动补全,识别jsx文件需增加
    },
    plugins: [
        new CompressionPlugin({
            //asset: '[path].gz[query]', 
            algorithm: 'gzip',//算法
            test: new RegExp(
                '\\.(js|css)$'  //压缩 js 与 css
            ),
            threshold: 10240,//只处理比这个值大的资源。按字节计算
            minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            favicon: 'app/assets/img/favicon.ico'
        }),
        new CleanWebpackPlugin(['../dist'], { allowExternal: true }),

        new webpack.DefinePlugin({ // <-- 减少 React 大小的关键
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new ExtractTextPlugin('static/css/styles.[contenthash].css'),
        new webpack.optimize.ModuleConcatenationPlugin(),

    ],

    optimization: {
        splitChunks: {
            chunks: "all",
            minChunks: 1,
            minSize: 0,
            cacheGroups: {
                framework: {
                    test: "framework",
                    name: "framework",
                    enforce: true
                },

            }
        }
    }

});
