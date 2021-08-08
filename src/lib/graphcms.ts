// Dependencies
import { GraphQLClient } from 'graphql-request'

// Internals
import { getSdk } from '@/generated/graphql'

/**
 * Client for GraphCMS API using `graphql-request`
 *
 * @param preview - If true, use the development token
 */
function client(preview = false): GraphQLClient {
  return new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${
        preview
          ? process.env.GRAPHCMS_DEVELOP_TOKEN
          : process.env.GRAPHCMS_PRODUCTION_TOKEN
      }`,
    },
  })
}

/**
 * Wrapper of the GraphCMS SDK to make it easier to use in the app.
 *
 * @param preview - If true, the request will be sent to the DRAFT endpoint.
 */
export function sdk(preview = false) {
  const sdk = getSdk(client(preview))

  return sdk
}
