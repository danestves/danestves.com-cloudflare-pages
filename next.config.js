const withPWA = require('next-pwa')
const withProgressBar = require('next-progressbar')

module.exports = withProgressBar(
  withPWA({
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      dest: 'public',
    },
    i18n: {
      locales: ['es', 'en'],
      defaultLocale: 'es',
    },
    images: {
      domains: [
        'github-readme-stats.danestves.com',
        'raw.githubusercontent.com',
        'media.graphcms.com',
      ],
    },
    webpack: (config, { dev, isServer }) => {
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      })

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
  })
)
