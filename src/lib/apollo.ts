// Dependencies
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
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

export default new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHCMS_PROJECT_API,
    fetch,
  }),
  cache,
})
