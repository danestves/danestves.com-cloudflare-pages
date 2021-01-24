const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withPWA({
    productionBrowserSourceMaps: true,
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      dest: 'public',
    },
    images: {
      domains: ['media.graphcms.com', 'github-readme-stats.danestves.com'],
    },
  })
)