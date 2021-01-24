const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
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
  }
)