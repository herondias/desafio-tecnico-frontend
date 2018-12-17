'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const devServer = {
    contentBase: path.resolve('dist'),
    hot: true,
    host: process.env.host || 'localhost',
    port: process.env.PORT || 5000
}

const wpkConfig = env => {
    const config = {
        entry: ['babel-polyfill', path.resolve('./app/core/bootstrap.js')],
        output: {
            path: path.resolve(__dirname, 'dist'),
            chunkFilename: '[name].chunk.js',
            filename: 'app-bundle.js'
        },

        module: {
            rules: [
                { // eslint
                    enforce: 'pre',
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                },
                { // babel
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'es2017'],
                        plugins: ['transform-async-to-generator']
                    }
                },
                { // html
                    test: /\.html?$/,
                    loader: 'raw-loader',
                    exclude: path.resolve('./app/index.html')
                },
                { // css
                    test: /\.css?$/,
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }]
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve('./app/index.html')
            }),

            new CopyWebpackPlugin([{
                from: 'app/assets',
                to: 'assets'
            }]),
           
            new CleanWebpackPlugin(['dist']),
        ]
    }

    if (env && env.dev) {
        config.devServer = devServer
        config.plugins.push(
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        )
    }
    
    if (env && env.production) {
        config.devtool = 'source-map'
        config.plugins.push(
            new UglifyJSPlugin({
                uglifyOptions: {
                    warnings: true
                },
                sourceMap: true
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        )
    }
    return config
}

module.exports =  wpkConfig