const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NODE_ENV !== 'development',
})
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins(
  [
    withBundleAnalyzer,
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === 'development',
          dest: 'public',
        },
      },
    ],
  ],
  {
    productionBrowserSourceMaps: true,
    images: {
      domains: ['media.graphcms.com', 'github-readme-stats.danestves.com'],
    },
    webpack: (config, { dev, isServer }) => {
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
)