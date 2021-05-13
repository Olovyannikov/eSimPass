const path = require('path');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
require('amd-loader');

// module.exports = {
//     sassOptions : {
//         includePaths: [path.join(__dirname, 'src/client/')],
//     },
//     module: {
//         rules: [{
//             test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
//             use: {
//             loader: 'url-loader',
//             options: {
//                 limit: 100000,
//                 name: '[name].[ext]'
//             }
//             }
//         }]
//     },
//     withCSS : withCSS(),
//     withImages : withImages(),
//     watch : true,
// }

module.exports = withCSS(withSass({
  webpack: function (config, {isServer}) {
      
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000000,
          name: '[name].[ext]',
          esModule : false,
        }
      }
    },
    )
    return config
  }
}))


