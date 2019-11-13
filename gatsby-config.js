module.exports = {
  siteMetadata: {
    title: `Daniel Esteves`,
    description: `Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para hacer tus sueños realidad.`,
    author: `@danestves`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Daniel Esteves`,
        short_name: `Daniel Esteves`,
        start_url: `/`,
        background_color: `#0090da`,
        theme_color: `#0090da`,
        display: `standalone`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://api.danestves.com`,
        queryLimit: 1000, // Default to 100
        contentTypes: [
          `skills`,
          `educations`,
          `experiences`,
          `portfolios`,
          `blogs`,
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
}
