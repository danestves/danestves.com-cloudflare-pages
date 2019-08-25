const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const nextOffline = require('next-offline')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const webpack = require('webpack')
const { withGraphQLConfig } = require('next-graphql-react/server')
const withProgressBar = require('next-progressbar')
require('dotenv').config()

module.exports = withPlugins([
  withGraphQLConfig,
  withCSS,
  [
    withProgressBar, {
      progressBar: {
        profile: true
      }
    }
  ],
  [nextOffline, ['!', PHASE_DEVELOPMENT_SERVER]]
], {
  target: 'serverless',
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  webpack (config) {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))

    return config
  }
})
