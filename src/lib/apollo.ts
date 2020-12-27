// Dependencies
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import { offsetLimitPagination } from '@apollo/client/utilities'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        portfolios: offsetLimitPagination(['first', 'skip']),
      },
    },
  },
})

const apollo = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHCMS_PROJECT_API,
    fetch,
  }),
  cache,
})

export const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return apollo
}

export default apollo
