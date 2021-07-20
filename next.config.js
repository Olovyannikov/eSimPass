const withImages = require('next-images');

module.exports = withImages({
    distDir: 'build/.next',
    webpack5: true,
    sassOptions: {
        prependData: `
        @import "./src/client/resources/styles/general/variables.scss";
        @import "./src/client/resources/styles/general/mixins.scss";
        `,
        _indentWidth: 4
    },
    webpack: (config, { dev }) => {

        let path = ''
        
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
