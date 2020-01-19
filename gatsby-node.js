const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const portfolios = await graphql(`
    query {
      allStrapiPortfolios {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  const blogs = await graphql(`
    query {
      allStrapiBlogs {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  portfolios.data.allStrapiPortfolios.edges.forEach(({ node }) => {
    createPage({
      path: `portafolio/${node.slug}`,
      component: path.resolve(`./src/templates/portafolio.js`),
      context: node,
    })
  })

  blogs.data.allStrapiBlogs.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.slug}`,
      component: path.resolve(`./src/templates/blog.js`),
      context: node,
    })
  })
}
