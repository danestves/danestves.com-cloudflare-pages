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
  async redirects() {
    return [
      {
        source: '/contact',
        destination: 'https://wa.me/message/V2KA74PJTEEYP1',
        permanent: true,
      },
      {
        source: '/DanielEsteves.pdf',
        destination: '/danestves.pdf',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/danestves?tab=repositories',
        permanent: true,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/danestves',
        permanent: true,
      },
      {
        source: '/youtube',
        destination: 'https://www.youtube.com/channel/UC6YYVDKZC3mu1iB8IOCFqcw',
        permanent: true,
      },
      {
        source: '/youtube/:id',
        destination: 'https://www.youtube.com/watch?v=:id',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/feed.xml',
        destination: '/api/feed',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
}

module.exports = withPlugins([withTM, [withBundleAnalyzer]], nextConfig)
