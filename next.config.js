const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const { withGraphQLConfig } = require('next-graphql-react/server')

module.exports = withPlugins(
  [
    withCSS,
    withGraphQLConfig
  ],
  {
    distDir: 'build',
    webpack (config) {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

      return config
    }
  }
)
