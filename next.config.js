const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: ['github-readme-stats.danestves.com'],
  },
  future: { webpack5: true },
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      require('./src/scripts/generate-sitemap')
      require('./src/scripts/generate-rss')
    }

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
})
