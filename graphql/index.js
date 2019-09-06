import { useGraphQL } from 'graphql-react'

export function getBlogs () {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride (options) {
      options.url = `${process.env.API_URL}`
    },
    operation: {
      query: /* GraphQL */ `
        {
          blogs {
            id
            slug
            cover {
              url
            }
            title
            content
          }
        }
      `
    }
  })

  return {
    loading,
    data,
    ...errors
  }
}
