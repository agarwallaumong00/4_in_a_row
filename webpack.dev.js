const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: ['./app/index.js']
    },
    devtool: "inline-source-map",
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: 'api/[name].[ext]',
                    context: ''
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
            filename: '../dist/index.html',
            template: './app/index.html'
        })
    ]
}