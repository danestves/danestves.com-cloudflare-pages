import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { window } from "browser-monads"

function SEO({ description, lang, meta, title, isTemplate }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={
        isTemplate
          ? `${title} | ${site.siteMetadata.title}`
          : `${
              title.length > 50 ? `${title.substr(0, 53)}...` : title
            } | @danestves`
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: isTemplate
            ? `${title} | ${site.siteMetadata.title}`
            : `${
                title.length > 50 ? `${title.substr(0, 53)}...` : title
              } | @danestves`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:email`,
          content: `estevesd8@gmail.com`,
        },
        {
          property: `og:country-name`,
          content: `VE`,
        },
        {
          property: `og:image`,
          content:
            "https://res.cloudinary.com/daniel-esteves/image/upload/v1578416972/og_tput81.jpg",
        },
        {
          property: `og:url`,
          content: window.location.href,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: isTemplate
            ? `${title} | ${site.siteMetadata.title}`
            : `${
                title.length > 50 ? `${title.substr(0, 53)}...` : title
              } | @danestves`,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content:
            "https://res.cloudinary.com/daniel-esteves/image/upload/v1578416972/og_tput81.jpg",
        },
        {
          name: `twitter:image:alt`,
          content: isTemplate
            ? `${title} | ${site.siteMetadata.title}`
            : `${
                title.length > 50 ? `${title.substr(0, 53)}...` : title
              } | @danestves`,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `es`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
