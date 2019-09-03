import { useGraphQL } from 'graphql-react'

export function toSlug (string) {
  const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
  const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  /* eslint-disable no-useless-escape */
  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

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

export function getPortfolios (page) {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride (options) {
      options.url = `${process.env.API_URL}`
    },
    operation: {
      query: /* GraphQL */ `
        {
          portfolios {
            id
            slug
            title
            cover {
              url
            }
            category {
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

export function getSinglePortfolio (slug) {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride (options) {
      options.url = `${process.env.API_URL}`
    },
    operation: {
      query: /* GraphQL */ `
        {
          portfolios(where: { slug_contains: "${slug}" }) {
            title
            content
            url
            cover {
              url
            }
            ogCover {
              url
            }
            category {
              name
            }
            technologies {
              id
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
