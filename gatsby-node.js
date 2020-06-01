const path = require('path');
const GithubSlugger = require('github-slugger');
const slugger = new GithubSlugger();

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
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
  `);
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
  `);
  const projects = await graphql(`
    query {
      allStrapiProjects {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  const tags = await graphql(`
    query {
      allStrapiTags {
        edges {
          node {
            name
          }
        }
      }
    }
  `);

  portfolios.data.allStrapiPortfolios.edges.forEach(({ node }) => {
    createPage({
      path: `portafolio/${node.slug}`,
      component: path.resolve(`./src/templates/portafolio.js`),
      context: node
    });
  });

  blogs.data.allStrapiBlogs.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.slug}`,
      component: path.resolve(`./src/templates/blog.js`),
      context: node
    });
  });

  projects.data.allStrapiProjects.edges.forEach(({ node }) => {
    createPage({
      path: `project/${node.slug}`,
      component: path.resolve(`./src/templates/project.js`),
      context: node
    });
  });

  tags.data.allStrapiTags.edges.forEach(({ node }) => {
    createPage({
      path: `tags/${slugger.slug(node.name)}`,
      component: path.resolve(`./src/templates/tags.js`),
      context: node
    });
  });
};
