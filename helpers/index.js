import { useGraphQL } from 'graphql-react'

export function getGitHubRepositories () {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride (options) {
      options.url = `${process.env.GITHUB_API_URL}`
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

export function getSkills () {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride (options) {
      options.url = `${process.env.API_URL}`
    },
    operation: {
      query: /* GraphQL */ `
        {
          skills {
            icon
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

export function getEducationsAndExperiences () {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride (options) {
      options.url = `${process.env.API_URL}`
    },
    operation: {
      query: /* GraphQL */ `
        {
          educations {
            title
            subtitle
            content
            date
            finished
          }
          experiences {
            title
            subtitle
            content
            date
            finished
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
