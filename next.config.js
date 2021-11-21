// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')
const { withContentlayer } = require('next-contentlayer')
const { withPlausibleProxy } = require('next-plausible')

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
    domains: ['i.ytimg.com', 'raw.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 15768000,
  },
  reactStrictMode: true,
  async redirects() {
    const resume = 'https://read.cv/danestves'

    return [
      {
        destination: '/es/posts/how-to-upgrade-everything-to-hooks',
        source:
          '/blog/react-hooks-la-oportunidad-de-mejorar-ckmsitgpcqfll0b24c39lpbnq',
        permanent: true,
      },
      {
        destination: '/danestves.pdf',
        source: '/DanielEsteves.pdf',
        permanent: true,
      },
      {
        destination:
          '/es/posts/what-is-tailwindcss-and-how-to-use-it-with-create-react-app',
        source: '/blog/configurar-tailwindcss-con-create-react-app',
        permanent: true,
      },
      {
        destination:
          '/posts/tailwindcss-what-it-is-and-how-to-get-started-with-visual-studio-code',
        source:
          '/blog/tailwindcss-what-it-is-and-how-to-get-started-with-visual-studio-code-ckmsbs7f4qa8d0c81g79bp228',
        permanent: true,
      },
      {
        destination: resume,
        source: '/portafolio/plexus-market-ckng74mu8dvsl0a81lmi29om5',
        permanent: true,
      },
      {
        destination: resume,
        source: '/resume',
        permanent: true,
      },
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
}

module.exports = withPlugins(
  [[withBundleAnalyzer], withContentlayer(), withPlausibleProxy()],
  nextConfig
)
