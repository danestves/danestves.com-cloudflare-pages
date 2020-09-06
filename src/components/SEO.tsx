// Dependencies
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { window } from 'browser-monads';

interface ISEOType {
  description?: string;
  lang?: string;
  meta?: any[];
  title?: string;
  isTemplate?: boolean;
  jsonLdProps?: Record<string, unknown>;
}

const SEO: React.FC<ISEOType> = ({
  description = ``,
  lang = `es`,
  meta = [],
  title,
  isTemplate = false,
  jsonLdProps,
}) => {
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
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const jsonLd = {
    '@context': `https://schema.org/`,
    '@type': `WebSite`,
    url: window.location.href,
    image: {
      '@type': `ImageObject`,
      url: `https://res.cloudinary.com/daniel-esteves/image/upload/v1599420857/ogcover_zcvlsa.png`,
      width: 1200,
      height: 628,
    },
    publisher: {
      '@type': `Organization`,
      name: `Daniel Esteves`,
      logo: {
        '@type': `ImageObject`,
        url: `https://danestves.com/logo.png`,
        width: 60,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': `WebPage`,
      '@id': `https://danestves.com`,
    },
    description,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={
        isTemplate
          ? `${title} | ${site.siteMetadata.title}`
          : `${title && title.length > 53 ? `${title.substr(0, 53)}...` : title} | @danestves`
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: `Daniel Esteves, Daniel, Esteves`,
        },
        {
          property: `og:title`,
          content: isTemplate
            ? `${title} | ${site.siteMetadata.title}`
            : `${title && title.length > 53 ? `${title.substr(0, 53)}...` : title} | @danestves`,
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
          content: `https://res.cloudinary.com/daniel-esteves/image/upload/v1599420857/ogcover_zcvlsa.png`,
        },
        {
          property: `og:image:width`,
          content: 1200,
        },
        {
          property: `og:image:height`,
          content: 628,
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
            : `${title && title.length > 53 ? `${title.substr(0, 53)}...` : title} | @danestves`,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: `https://res.cloudinary.com/daniel-esteves/image/upload/v1599420857/ogcover_zcvlsa.png`,
        },
        {
          name: `twitter:image:alt`,
          content: isTemplate
            ? `${title} | ${site.siteMetadata.title}`
            : `${title && title.length > 50 ? `${title.substr(0, 53)}...` : title} | @danestves`,
        },
      ].concat(meta || [])}
    >
      <link rel="canonical" href={window.location.href} />
      <script type="application/ld+json">{JSON.stringify(jsonLdProps ? jsonLdProps : jsonLd, undefined, 4)}</script>
    </Helmet>
  );
};

export default SEO;
