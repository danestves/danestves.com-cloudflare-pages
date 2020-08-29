// Dependencies
import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

// Components
import { SEO, CallToAction } from '../components';

// Types
import { PortfolioCardType } from '../types';

type Props = {
  data: {
    allStrapiPortfolios: { nodes: [PortfolioCardType] };
  };
};

const Portfolio: React.FC<Props> = ({
  data: {
    allStrapiPortfolios: { nodes: portfoliosData },
  },
}) => {
  // States
  const [portfolios] = React.useState<Array<PortfolioCardType>>(portfoliosData);
  const [filteredPortfolios, setFilteredPortfolios] = React.useState<Array<PortfolioCardType>>(portfoliosData);

  // Functions
  const filter = (name: string) => {
    if (name === ``) {
      setFilteredPortfolios(portfolios);
    } else {
      const filterType = portfolios.filter(e => e.category.name === name);

      setFilteredPortfolios(filterType);
    }
  };

  // Render
  return (
    <>
      <SEO
        isTemplate
        title="Portafolio"
        description="Portafolio de Daniel Esteves para mostrar sus proyectos realizados en todo su trayecto como desarrollador web frontend. React, NextJS, Gatsby y WordPress."
      />

      {/* Space for Header */}
      <div className="w-full min-h-20 bg-secondary"></div>

      <div className="w-full bg-secondary">
        <div className="container px-5">
          <div className="mb-5 text-right">
            <p className="mb-3 text-lg text-primary">Filtrar por:</p>
            <div className="relative inline-block w-64">
              <select
                onChange={e => filter(e.target.value)}
                className="block w-full px-4 py-2 pr-8 leading-tight bg-transparent border border-gray-400 rounded shadow appearance-none text-primary hover:border-gray-500 focus:outline-none focus:shadow-outline"
              >
                <option value="">Mostrar todos</option>
                <option value="Educativa">Educativa</option>
                <option value="Diseño Web">Diseño Web</option>
                <option value="Moda">Moda</option>
                <option value="Gastronomía">Gastronomía</option>
                <option value="Medicinal">Medicinal</option>
                <option value="Tienda Virtual">Tienda Virtual</option>
                <option value="Informativa">Informativa</option>
                <option value="Inmobiliaria">Inmobiliaria</option>
                <option value="Diseño">Diseño</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <hr className="border-primary" />

          <div className="grid justify-center grid-cols-1 gap-12 py-5 sm:grid-cols-2 md:grid-cols-3">
            {filteredPortfolios.map(item => (
              <div key={item.id} className="w-full">
                <Link
                  to={`/portafolio/${item.slug}`}
                  className="relative block overflow-hidden transition-all duration-150 rounded-lg group portfolio-link hover:shadow-lg"
                >
                  <div>
                    <Img
                      fluid={item.cover.childImageSharp.fluid}
                      className="w-full transition-all duration-200 rounded-lg shadow-xl portfolio-image hover:shadow-2xl"
                      imgStyle={{ objectPosition: `top center` }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-200 bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 backdrop-blur bg-secondary">
                      <div className="relative w-10/12">
                        <div className="flex flex-col px-4 py-2 transition-all duration-200 bg-white rounded-lg">
                          <h2 className="my-2 text-2xl leading-none text-center lg:text-xl">{item.title}</h2>
                          <h3 className="mb-2 text-xl font-light leading-none text-center text-gray-500 lg:text-lg">
                            {item.category.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CallToAction />
    </>
  );
};

export const query = graphql`
  query Portafolios {
    allStrapiPortfolios(sort: { fields: [title], order: [ASC] }) {
      nodes {
        id
        slug
        title
        cover {
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        category {
          name
        }
      }
    }
  }
`;

export default Portfolio;
