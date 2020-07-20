require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `Daniel Esteves - Desarrollador Web`,
    description: `Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para hacer tus sueños realidad.`,
    author: `@danestves`,
    siteUrl: `https://danestves.com`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#4c51bf`,
        showSpinner: false
      }
    },
    `gatsby-plugin-use-dark-mode`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-statickit`,
      options: {
        siteId: process.env.GATSBY_SITE
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-138339985-1',
        head: false,
        anonymize: true,
        respectDNT: true,
        pageTransitionDelay: 0,
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'danestves.com'
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://danestves.com',
        sitemap: 'https://danestves.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/', disallow: '/dayairis' }]
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Poppins\:400,700`, `Lato\:400,700`],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `danestves`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Daniel Esteves`,
        short_name: `Daniel Esteves`,
        start_url: `/`,
        background_color: `#4c51bf`,
        theme_color: `#4c51bf`,
        display: `standalone`,
        icon: `src/images/logo.png`
      }
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `${process.env.GATSBY_API}`,
        queryLimit: 1000, // Default to 100
        contentTypes: [
          `educations`,
          `experiences`,
          `portfolios`,
          `blogs`,
          `tags`,
          `projects`
        ],
        singleTypes: [`home`]
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allStrapiBlogs } }) => {
              return allStrapiBlogs.nodes.map(edge => {
                return Object.assign({}, edge, {
                  title: edge.title,
                  link: `${site.siteMetadata.siteUrl}/blog/${edge.slug}`,
                  pubDate: edge.createdAt,
                  guid: `${site.siteMetadata.siteUrl}/blog/${edge.slug}`,
                  description: `${edge.body.substr(0, 300)}...`,
                })
              })
            },
            query: `
              {
                allStrapiBlogs(sort: { fields: [createdAt], order: [DESC] }) {
                  nodes {
                    id
                    slug
                    title
                    createdAt(formatString: "MMM DD YYYY", locale: "es")
                    body
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Daniel Esteves | RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
          },
        ],
      },
    },
  ]
};
