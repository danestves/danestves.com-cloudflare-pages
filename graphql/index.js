import { useGraphQL } from "graphql-react";

export function getSkills() {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url = `${process.env.API_URL}`;
    },
    operation: {
      query: `
        {
          skills {
            icon
            title
            content
          }
        }
      `
    }
  });

  return {
    loading,
    data,
    ...errors
  };
}

export function getEducationsAndExperiences() {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url = `${process.env.API_URL}`;
    },
    operation: {
      query: `
        {
          educations {
            title
            subtitle
            content
            date
            finished
          }
          experiences(sort: "date:desc") {
            title
            subtitle
            content
            date
            finished
          }
        }
      `
    }
  });

  return {
    loading,
    data,
    ...errors
  };
}

export function getGitHubRepositories() {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url = `${process.env.GITHUB_API_URL}`;
      options.headers = {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      };
    },
    operation: {
      query: `
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
  });

  return {
    loading,
    data,
    ...errors
  };
}

export function getPortfolios(page) {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url = `${process.env.API_URL}`;
    },
    operation: {
      query: `
        {
          portfolios(sort: "title:asc") {
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
  });

  return {
    loading,
    data,
    ...errors
  };
}

export function getSinglePortfolio(slug) {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url = `${process.env.API_URL}`;
    },
    operation: {
      query: `
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
  });

  return {
    loading,
    data,
    ...errors
  };
}

export function getBlogs() {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url = `${process.env.API_URL}`;
    },
    operation: {
      query: `
        {
          blogs(sort: "date:desc") {
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
  });

  return {
    loading,
    data,
    ...errors
  };
}

export function getSingleBlog(slug) {
  const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url = `${process.env.API_URL}`;
    },
    operation: {
      query: `
        {
          blogs(where: { slug_contains: "${slug}" }) {
            id
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
  });

  return {
    loading,
    data,
    ...errors
  };
}
