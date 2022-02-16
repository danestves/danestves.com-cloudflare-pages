/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  server: 'functions/[[path]].ts',
  serverBuildTarget: 'cloudflare-pages',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['.*'],
};
