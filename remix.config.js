/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  server: './server/index.ts',
  serverBuildTarget: 'cloudflare-pages',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['.*'],
};
