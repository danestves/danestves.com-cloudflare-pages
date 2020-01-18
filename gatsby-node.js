const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const progress = reporter.createProgress(`danestves/gatsby-node.js`);
  console.time("(danestves) total exports.createPages");
  console.time("(danestves) initial graphql query");
  progress.setStatus("initial graphl query");
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

  console.timeEnd("(danestves) initial graphql query");

  console.time("(danestves) created pages");

  progress.start();
  progress.total = portfolios.data.allStrapiPortfolios.edges.length - 1;
  progress.total = blogs.data.allStrapiBlogs.edges.length - 1;
  let start = Date.now();
  progress.setStatus(
    "Calling createPage for " + portfolios.data.allStrapiPortfolios.edges.length + " portfolio pages"
  );
  progress.setStatus(
    "Calling createPage for " + blogs.data.allStrapiBlogs.edges.length + " blogs pages"
  );

  portfolios.data.allStrapiPortfolios.edges.forEach(({ node }) => {
    createPage({
      path: `portafolio/${node.slug}`,
      component: path.resolve(`./src/templates/portafolio.js`),
      context: node,
    });
    progress.tick(1);
  })

  blogs.data.allStrapiBlogs.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.slug}`,
      component: path.resolve(`./src/templates/blog.js`),
      context: node,
    });
    progress.tick(1);
  })

  progress.setStatus(
    "Called createPage for " +
      (portfolios.data.allStrapiPortfolios.edges.length - 1) +
      " pages at " +
      (portfolios.data.allStrapiPortfolios.edges.length - 1) /
        ((Date.now() - start) / 1000) +
      " pages/s"
  );
  progress.setStatus(
    "Called createPage for " +
      (blogs.data.allStrapiBlogs.edges.length - 1) +
      " pages at " +
      (blogs.data.allStrapiBlogs.edges.length - 1) /
        ((Date.now() - start) / 1000) +
      " pages/s"
  );  progress.done();
  console.timeEnd("(danestves) created pages");
  console.timeEnd("(danestves) total exports.createPages");
  progress.setStatus("createPages finished");
}
