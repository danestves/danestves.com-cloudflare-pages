module.exports = {
  /** @type {import("pm2/types").StartOptions[]} */
  apps: [
    {
      name: 'Remix',
      script: 'remix watch',
      autorestart: false,
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'Miniflare',
      script: 'npm run start',
      autorestart: false,
      ignore_watch: ['.'],
      watch_options: {
        followSymlinks: false,
      },
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'Tailwind CSS',
      script: 'npm run dev:style',
      autorestart: false,
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'Content',
      script: 'npm run content:watch',
      autorestart: false,
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
