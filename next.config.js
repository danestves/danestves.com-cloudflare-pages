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
    minimumCacheTTL: 15768000,
  },
  async headers() {
    return [
      {
        source: '/',
        headers: securityHeaders,
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
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

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.twitter.com *.youtube.com plausible.io;
  child-src 'self' *.codepen.io *.cloudinary.com *.google.com *.twitter.com *.youtube.com codesandbox.io;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' *.googleapis.com *.amazonaws.com *.gstatic.com;
  worker-src 'self';
  object-src 'self';
  frame-src 'self' codepen.io codesandbox.io;
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]
