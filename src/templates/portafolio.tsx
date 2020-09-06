// Dependencies
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Markdown from 'react-markdown';
import { window } from 'browser-monads';
import removeMarkdown from 'remove-markdown';
import { AiFillTags, AiOutlineLink } from 'react-icons/ai';
import { BiCodeAlt } from 'react-icons/bi';

// Components
import { SEO, CallToAction } from '../components';

// Types
import { ISinglePortfolio } from '../types';

type Props = {
  data: {
    strapiPortfolios: ISinglePortfolio;
  };
};

const Portfolio: React.FC<Props> = ({ data: { strapiPortfolios: portfolio } }) => {
  // Render
  return (
    <>
      <SEO
        isTemplate
        title={portfolio.title}
        description={`${removeMarkdown(portfolio.body).substr(0, 157)}...`}
        meta={[
          {
            name: `language`,
            content: `ES`,
          },
          {
            name: `url`,
            content: window.location.href,
          },
          {
            name: `date`,
            content: portfolio.createdAt,
          },
          {
            name: `identifier`,
            content: `0-2345-6634-6`,
          },
          {
            name: `twitter:image`,
            content: `https://danestves.com${portfolio.ogCover.publicURL}`,
          },
          {
            name: `twitter:image:alt`,
            content: portfolio.title,
          },
        ]}
      />

      <Helmet>
        <meta property="og:url" content={window.location.url} />
        <meta property="og:image" content={portfolio.ogCover.publicURL} />
      </Helmet>

      {/* Space for Header */}
      <div className="w-full min-h-20 bg-secondary"></div>

      <div className="w-full bg-secondary">
        <div className="container px-5">
          <div className="overflow-hidden rounded-lg container-image">
            <Img
              fluid={portfolio.cover.childImageSharp.fluid}
              alt={`Portafolio: ${portfolio.title} | Daniel Esteves`}
              className="block max-w-full mx-auto rounded-lg"
              imgStyle={{ objectPosition: `top center` }}
            />
          </div>

          <div className="max-w-4xl mx-auto mt-4 mb-8">
            <div className="grid items-center grid-cols-1 gap-6 py-4 md:grid-cols-3">
              <div>
                <h2 className="text-2xl text-center text-white">
                  <AiFillTags className="inline-block mr-1 text-primary" />
                  {portfolio.category.name}
                </h2>
              </div>
              <div>
                <h2 className="text-2xl text-center text-white">
                  <BiCodeAlt className="inline-block mr-1 text-primary" />
                  <span className="text-xl">{portfolio.technologies.map(t => t.name).join(`,`)}</span>
                </h2>
              </div>
              <div className="text-center">
                <a
                  href={portfolio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded text-secondary bg-primary"
                >
                  Ver Proyecto <AiOutlineLink className="inline-block ml-1 text-secondary" />
                </a>
              </div>
            </div>

            <Markdown
              className="py-5 text-lg prose text-justify text-primary"
              source={portfolio.body}
              escapeHtml={false}
            />

            <hr className="mb-8 border-primary" />

            <p className="text-center text-gray-500">
              Este portafolio tiene como objetivo mostrar trabajos previamente realizados a través de enlaces externos.
              El desarrollador no se hace responsable por enlaces inaccesibles o trabajos modificados posterior a su
              entrega. Una vez entregado el trabajo encargado. queda a responsabilidad total del cliente el
              mantenimiento y buen uso del servicio solicitado originalmente.
            </p>
          </div>

          <Img
            fluid={portfolio.cover.childImageSharp.fluid}
            alt={`Portafolio: ${portfolio.title} | Daniel Esteves`}
            className="block max-w-full mx-auto rounded-lg"
            imgStyle={{ objectPosition: `top center` }}
          />
        </div>
      </div>

      <CallToAction />
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    strapiPortfolios(slug: { eq: $slug }) {
      title
      body
      cover {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
        publicURL
      }
      ogCover {
        publicURL
      }
      category {
        name
      }
      technologies {
        id
        name
      }
      url
      createdAt(formatString: "YYYY-MM-DD")
      isActive
    }
  }
`;

export default Portfolio;
