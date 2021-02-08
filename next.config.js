const withPWA = require('next-pwa')

// change start-url cache strategy, so that we can prompt user to reload when
// new version available, instead of showing new version directly
const runtimeCaching = require('next-pwa/cache')
runtimeCaching[0].handler = 'StaleWhileRevalidate'

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: false,
    skipWaiting: false,
    runtimeCaching,
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
