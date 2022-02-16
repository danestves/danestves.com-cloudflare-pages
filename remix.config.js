/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  serverBuildDirectory: 'build',
  serverBuildTarget: 'cloudflare-pages',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['.*'],
};
