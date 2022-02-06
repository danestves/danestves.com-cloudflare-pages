module.exports = {
  /**
   * @type {import("pm2/types").StartOptions[]}
   */
  apps: [
    {
      name: 'Styles',
      script: 'postcss styles/**/*.css --base styles --dir app/styles --watch',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
      },
    },
    {
      name: 'Remix',
      script: 'remix watch',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
      },
    },
    {
      name: 'Wrangler',
      script: 'wrangler pages dev ./public --watch ./build',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
      },
    },
  ],
};
