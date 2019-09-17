import { useGraphQL } from 'graphql-react'

export function getBlogs() {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url = `${process.env.API_URL}`
    },
    operation: {
      query: /* GraphQL */ `
        {
          blogs {
            id
            slug
            ogCover {
              url
            }
            title
            content
            date
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

export function getSingleBlog(slug) {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url = `${process.env.API_URL}`
    },
    operation: {
      query: /* GraphQL */ `
        {
          blogs(where: { slug_contains: "${slug}" }) {
            title
            content
            date
            cover {
              url
            }
            ogCover {
              url
            }
            tags {
              name
            }
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
