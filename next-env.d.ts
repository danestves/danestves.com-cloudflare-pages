/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
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
  }
}

declare module 'kwesforms'

declare module 'browser-monads' {
  export const window: Window & {
    workbox: any
  }
  export const document: Document
  export function exists(variable: any): boolean
}
declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export default value
}
declare module 'remark-code-titles'
declare module '@fec/remark-a11y-emoji'
declare module 'mdx-prism'
declare module 'comma-number'

export interface IProcessEnv {
  AUTHENTICATION_API_URL: string
  GRAPHQL_API_URL: string
}
