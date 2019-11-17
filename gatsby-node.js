const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`
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

  result.data.allStrapiPortfolios.edges.forEach(({ node }) => {
    createPage({
      path: `portafolio/${node.slug}`,
      component: path.resolve(`./src/templates/portafolio.js`),
      context: node,
    })
  })
}
