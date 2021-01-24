const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: ['media.graphcms.com', 'github-readme-stats.danestves.com'],
  },
})
