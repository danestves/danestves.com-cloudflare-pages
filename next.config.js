const withPWA = require('next-pwa')

module.exports = withPWA({
  productionBrowserSourceMaps: true,
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
  },
  images: {
    domains: ['media.graphcms.com', 'github-readme-stats.danestves.com'],
  },
})
