const name = 'Work Flow Editor'

module.exports = {
  publicPath: '/workflow/',
  configureWebpack: {
    name,
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Workflow Editor'
      return args
    })

    config
      .entry('main')
      .add('@babel/polyfill')
  }
}
