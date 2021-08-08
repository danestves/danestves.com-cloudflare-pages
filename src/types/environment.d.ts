interface ProcessEnv {
  NODE_ENV: 'development' | 'production' | 'test'
  PORT?: string | number
  GITHUB_TOKEN: string
  GOOGLE_ENCRYPTION_IV: string
  GOOGLE_ENCRYPTION_KEY: string
  REVUE_TOKEN: string
  GIPHY_TOKEN: string
  GRAPHCMS_ENDPOINT: string
  GRAPHCMS_DEVELOP_TOKEN: string
  GRAPHCMS_PRODUCTION_TOKEN: string
  NEXT_PUBLIC_ALGOLIA_INDEX_NAME: string
  NEXT_PUBLIC_ALGOLIA_APP_ID: string
  NEXT_PUBLIC_ALGOLIA_API_KEY: string
  ALGOLIA_ADMIN_API_KEY: string
  WEBHOOK_SECRET_KEY: string
}
