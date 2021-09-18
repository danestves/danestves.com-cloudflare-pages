// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')
const withPreact = require('next-plugin-preact')
const withTM = require('next-transpile-modules')([
  'remark-torchlight',
  '@torchlight-api/torchlight-cli',
])

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  // @ts-ignore the rest of the config is not required
  images: {
    domains: ['i.ytimg.com', 'media.graphcms.com', 'raw.githubusercontent.com'],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      {
        source: '/DanielEsteves.pdf',
        destination: '/danestves-resume.pdf',
        permanent: true,
      },
      {
        source: '/danestves.pdf',
        destination: '/danestves-resume.pdf',
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

module.exports = withPlugins(
  [withTM, [withBundleAnalyzer], [withPreact]],
  nextConfig
)
