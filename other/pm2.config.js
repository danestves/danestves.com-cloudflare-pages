module.exports = {
  /**
   * @type {import("pm2/types").StartOptions[]}
   */
  apps: [
    {
      name: 'Prisma',
      script: 'prisma generate',
      watch: ['./prisma'],
      autorestart: false,
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        PRISMA_CLIENT_ENGINE_TYPE: 'dataproxy',
      },
    },
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
        DATABASE_URL: process.env.DATABASE_URL,
      },
    },
    {
      name: 'Miniflare',
      script:
        'miniflare --global-async-io --global-timers --global-random --build-command "node -r dotenv/config ./scripts/build.mjs" --build-watch-path ./worker --build-watch-path ./build/index.js --no-cache --watch --open',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        DATABASE_URL: process.env.DATABASE_URL,
      },
    },
  ],
};
