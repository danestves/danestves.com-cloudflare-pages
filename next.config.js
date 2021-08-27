// @ts-check
const withPreact = require('next-plugin-preact')

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
}

module.exports = module.exports = withPreact(nextConfig)
