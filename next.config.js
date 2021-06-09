const withImages = require('next-images');

module.exports = withImages({
    distDir: 'build/.next',
    future: {
        webpack5: true
    },
    webpack: (config, { dev }) => {

        var path = ''
        
        if (dev) {
            path = "pages/"
        }

        config.module.rules.push(
          {
            test: [/\.proto$/],
            loader: require.resolve('file-loader'),
            options: {
              name: './' + path + '[name].proto',
              emitFile: true,
              useRelativePath : true
            }
          }
        )
        return config
      }
})
