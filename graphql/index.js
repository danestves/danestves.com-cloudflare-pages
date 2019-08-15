import { useGraphQL } from 'graphql-react'

export function getGitHubData () {
  const { loading, cacheValue = {} } = useGraphQL({
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
            login
          }
        }
      `
    }
  })

  const { data } = cacheValue

  return {
    data,
    loading
  }
}
