namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    /**
     * The admin api key for your Algolia account.
     */
    readonly ALGOLIA_ADMIN_API_KEY: string
    /**
     * Giphy API token
     */
    readonly GIPHY_TOKEN: string
    /**
     * IP Lookup API key
     */
    readonly IP_LOOKUP_API_KEY: string
    /**
     * The app id for your Algolia account.
     */
    readonly NEXT_PUBLIC_ALGOLIA_APP_ID: string
    /**
     * The api key for your Algolia account.
     */
    readonly NEXT_PUBLIC_ALGOLIA_API_KEY: string
    /**
     * NEXT_PUBLIC_ALGOLIA_INDEX_NAME
     */
    readonly NEXT_PUBLIC_ALGOLIA_INDEX_NAME: string
    /**
     * This key is safe to use in a browser if you have enabled Row Level Security for your tables and configured policies.
     */
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    /**
     * A RESTful endpoint for querying and managing your database.
     */
    readonly NEXT_PUBLIC_SUPABASE_URL: string
    /**
     * Revue API token to manage newsletter (https://www.getrevue.co/app/integrations)
     */
    readonly REVUE_TOKEN: string
    /**
     * YouTube API key
     */
    readonly YOUTUBE_API_KEY: string
  }
}
