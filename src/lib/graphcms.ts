// Dependencies
import { GraphQLClient } from 'graphql-request'

// Internals
import { getSdk } from '@/generated/graphql'
import type { Sdk } from '@/generated/graphql'

/**
 * Client for GraphCMS API using `graphql-request`
 *
 * @param preview - If true, use the development token
 */
function client(preview = false): GraphQLClient {
  return new GraphQLClient(process.env.GRAPHCMS_CONTENT_API, {
    headers: {
      Authorization: `Bearer ${
        preview
          ? process.env.GRAPHCMS_CONTENT_API_TOKEN_DEVELOP
          : process.env.GRAPHCMS_CONTENT_API_TOKEN_PRODUCTION
      }`,
    },
  })
}

/**
 * Wrapper of the GraphCMS SDK to make it easier to use in the app.
 *
 * @param preview - If true, the request will be sent to the DRAFT endpoint.
 */
export function sdk(preview = false): Sdk {
  const sdk = getSdk(client(preview))

  return sdk
}
