const path = require('path');
const webpack = require('webpack');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        app: ['./app/index.js']
    },
    devtool: 'inline-source-map',
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
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  'url-loader',
                  'img-loader'
                ]
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLWebPackPlugin({
            filename: '../dist/index.html',
            template: './app/index.html'
        })
    ]
}