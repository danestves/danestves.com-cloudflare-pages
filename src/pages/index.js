// Dependencies
import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

// Components
import { Fade, Layout, SEO, Logo, BlogCard, Services } from '../components';

const IndexPage = ({
  data: {
    strapiHome: home,
    allStrapiBlogs: blogs,
    allStrapiPortfolios: portfolios
  }
}) => {
  if (!home) return null;

  return (
    <Layout>
      <SEO title="Inicio" isTemplate />

      <div className="relative flex items-center min-h-screen py-24" id="hero">
        <div className="container z-20 grid items-center grid-cols-12 px-5">
          <div className="col-span-12 md:col-span-5">
            <Logo className="w-64 h-64 mx-auto text-primary" />
          </div>
          <div className="col-span-12 md:col-span-7">
            <h1 className="mb-2 text-6xl font-bold leading-none text-primary">
              Daniel Esteves
            </h1>
            <h2 className="font-mono text-xl text-primary">
              Programador web fullstack en JavaScript
            </h2>
          </div>
        </div>
      </div>

      <div className="container px-5">
        <img
          src="/me.jpeg"
          alt="Daniel Esteves"
          className="absolute z-30 w-48 h-48 mx-auto -mt-24 transform -translate-x-1/2 border-white rounded-full left-1/2 border-10"
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query HomePage {
    strapiHome {
      name
      title
      text
      image {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      skills {
        id
        icon
        title
        content
      }
    }

    allStrapiPortfolios(limit: 3, sort: { fields: createdAt, order: [DESC] }) {
      nodes {
        id
        slug
        title
        cover {
          childImageSharp {
            fluid(maxWidth: 300, quality: 50) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        category {
          name
        }
      }
    }

    allStrapiBlogs(limit: 3, sort: { fields: createdAt, order: DESC }) {
      nodes {
        id
        slug
        ogCover {
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 314, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags {
          id
          name
        }
        title
        createdAt(formatString: "MMM DD YYYY", locale: "es")
        body
      }
    }
  }
`;

export default IndexPage;
