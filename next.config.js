const webpack = require('webpack')

module.exports = {
  images: {
    domains: ['github-readme-stats.danestves.com'],
  },
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      require('./src/scripts/generate-sitemap')
      require('./src/scripts/generate-rss')
    }

    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      })
    )

    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
}