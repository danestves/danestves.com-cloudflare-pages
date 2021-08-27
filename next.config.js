// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')
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

module.exports = withPlugins([[withBundleAnalyzer], [withPreact]], nextConfig)
