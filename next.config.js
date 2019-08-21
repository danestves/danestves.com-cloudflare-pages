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
  ]
], {
  target: 'serverless',
  webpack (config) {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))

    return config
  }
})
