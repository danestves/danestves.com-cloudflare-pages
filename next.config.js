const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE,
})
const withPWA = require('next-pwa')
const withMDX = require('@next/mdx')()

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
    withMDX
  ],
  {
    productionBrowserSourceMaps: true,
    images: {
      domains: ['github-readme-stats.danestves.com'],
    },
    webpack: (config, { dev, isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: 'empty',
        }
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
  }
)