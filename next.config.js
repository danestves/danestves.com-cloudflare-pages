const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const nextOffline = require('next-offline')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const webpack = require('webpack')
const { withGraphQLConfig } = require('next-graphql-react/server')
const withProgressBar = require('next-progressbar')
const getPathsObject = require('./scripts/getPathsObject')
const withManifest = require('next-manifest')
require('dotenv').config()

const defaults = {
  // next-manifest options
  output: './static/',
  // manifest options
  name: 'Daniel Esteves - Desarrollador Web Frontend',
  short_name: 'Daniel E.',
  theme_color: '#0090DA',
  background_color: '#0090da',
  display: 'standalone',
  Scope: '/',
  start_url: '/',
  icons: [
    {
      src: '/static/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-128x128.png',
      sizes: '128x128',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-144x144.png',
      sizes: '144x144',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-152x152.png',
      sizes: '152x152',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ],
  splash_pages: null
}

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
  [nextOffline, ['!', PHASE_DEVELOPMENT_SERVER]],
  [
    withManifest, {
      manifest: {
        ...defaults
      }
    }
  ]
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
  exportPathMap: function () {
    const fileObj = getPathsObject()
    return {
      ...fileObj,
      '/': { page: '/' }
    }
  },
  webpack (config) {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env),
      new webpack.IgnorePlugin(/^encoding$/, /node-fetch/)
    )

    return config
  }
})
