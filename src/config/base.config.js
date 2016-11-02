const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '../..'),
    entry: './src/app/index.js',
    output: {
        path: path.resolve(__dirname, '../../public/assets/'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    loaders: [
        {
            test: /\.(jpg|jpeg|png|gif|svg|mp3|otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
            loader: 'url-loader?limit=8192'
        },
        {
            test: /\.js$/,
            include: path.join(__dirname, '..'),
            loaders: process.env.NODE_ENV === 'development' ?
                [
                    'react-hot-loader/webpack',
                    'babel'
                ]
                :
                [
                    'babel'
                ]
        },
        {
            test: /\.scss$/,
            loader: 'style!css!sass'
        },
        {
            test: /\.css$/,
            loader: 'style!css'
        }
    ],
    resolve: {
        extensions: ['', '.js', '.json']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../assets/index.html')
        })
    ]
};
