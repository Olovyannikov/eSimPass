const withImages = require('next-images');

module.exports = withImages({
    distDir: 'build/.next',
    future: {
        webpack5: true
    }
})
