// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  '@torchlight-api/torchlight-cli',
  'remark-torchlight',
])

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  images: {
    domains: ['i.ytimg.com', 'media.graphcms.com', 'raw.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 15768000,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
}

module.exports = withPlugins([withTM, [withBundleAnalyzer]], nextConfig)
