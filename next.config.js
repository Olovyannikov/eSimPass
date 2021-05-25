require('amd-loader')
const path = require('path');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const webpack = require('webpack');
const ES6Promise = require("es6-promise");
ES6Promise.polyfill();


module.exports = withCSS(withSass({
    webpack: function (config, options) {
        config.plugins.push(new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Promise: 'es6-promise-promise',
        }))
        config.module.rules.push(
            {
                test: /.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                include: path.resolve('./client/pages/'),
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: './tsconfig.json',
                    },
                },
            },
        {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use:{
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    limit: 10000000,
                    esModule : false,
                }
            }
        },
    )
        return config
    }
}))
