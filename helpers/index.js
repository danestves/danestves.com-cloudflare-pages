import { useGraphQL } from 'graphql-react'

export function getGitHubRepositories () {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride (options) {
      options.url = 'https://api.github.com/graphql'
      options.headers = {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    },
    operation: {
      query: /* GraphQL */ `
        {
          viewer {
            repositories(first: 100) {
              totalCount
              nodes {
                owner {
                  login
                }
                name
                url
                isPrivate
              }
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
