require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Daniel Esteves`,
    description: `Daniel Esteves desarrollador web frontend ha realizado sitios web utilizando WordPress, React, Gatsby, NextJS y mucho más. Listo para hacer tus sueños realidad.`,
    author: `@danestves`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#4c51bf`,
        showSpinner: false,
      },
    },
    `gatsby-plugin-use-dark-mode`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Fira Code`],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        injectPageProps: false,
      },
    },
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
        icon: `src/images/logo.png`,
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
