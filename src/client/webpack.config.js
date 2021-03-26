const path = require('path');
const Buffer = require('buffer/').Buffer;
const ES6Promise = require("es6-promise");
ES6Promise.polyfill();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {
    return {
        target: ['web', 'es5'],
        entry: './src/client/index.tsx',
        optimization: {
            minimize: false
        },
        performance: {
            hints: false
        },
        module: {
            rules: [
                { 
                    test: /\.tsx?$/,
                    use: [{
                            loader: 'ts-loader',
                            options: {
                                configFile: `tsc.json`
                            }
                        }]
                },
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false
                            }
                        },
                        {
                            loader: 'sass-loader'                        
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                },{ 
                    test: /.(json)$/, use: { loader: 'file-loader', options: { name: '[name].[ext]', outputPath: './' } } 
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: 'bundle.[fullhash].js',
            publicPath: '/',
            path: path.resolve(__dirname, '../../build/src')
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/client/index.html"
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                Promise: 'es6-promise-promise', 
            }),
            new webpack.DefinePlugin({
                "process.env": "{}",
                global: {}
            }),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            })
        ],
        devServer: {
            host : '0.0.0.0',
            index: 'index.html',
            historyApiFallback: true,
            contentBase: './',
            host: '0.0.0.0'
        }
    }
};
 