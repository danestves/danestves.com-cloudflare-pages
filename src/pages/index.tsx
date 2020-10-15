// Dependencies
import * as React from 'react';
import { graphql, PageProps, Link } from 'gatsby';
import { IoLogoNodejs, IoLogoWordpress } from 'react-icons/io';
import { GrReactjs, GrGraphQl } from 'react-icons/gr';
import Img from 'gatsby-image';

// Components
import { SEO, Logo, Features } from '../components';

// Types
import { IHome, IPortfolioCard, IProjectCard, IBlogCard } from '../types';

interface HomeProps extends PageProps {
  data: {
    strapiHome: IHome;
    allStrapiPortfolios: {
      nodes: [IPortfolioCard];
    };
    allStrapiProjects: {
      nodes: [IProjectCard];
    };
    allStrapiBlogs: {
      nodes: [IBlogCard];
    };
  };
}

const IndexPage: React.FC<HomeProps> = ({
  data: {
    strapiHome: home,
    allStrapiPortfolios: { nodes: portfolios },
    allStrapiProjects: { nodes: projects },
    allStrapiBlogs: { nodes: blogs },
  },
}) => {
  // Methods
  const portfoliosArray = (data: [IPortfolioCard]): Array<IPortfolioCard> => {
    return data.slice(1);
  };

  // Render
  if (!home) return null;

  return (
    <>
      <SEO title="Inicio" isTemplate />

      <div className="relative flex items-center py-32 lg:py-20" id="hero">
        <div className="container z-20 grid items-center grid-cols-12 px-5">
          <div className="col-span-12 md:col-span-5">
            <Logo className="w-48 h-48 mx-auto mb-4 md:mb-0 md:w-56 lg:w-64 md:h-56 lg:h-64 text-primary" />
          </div>
          <div className="col-span-12 md:col-span-7">
            <h1 className="mb-2 text-6xl font-bold leading-none text-center md:text-left text-primary">
              Daniel Esteves
            </h1>
            <h2 className="font-mono text-xl text-center md:text-left text-primary">
              Programador web fullstack en JavaScript
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="container relative z-10 px-5 pb-32 -mt-24">
          <img
            src="/me.jpeg"
            alt="Daniel Esteves"
            className="z-30 w-48 h-48 mx-auto border-white rounded-full border-10"
          />

          <h2 className="mt-4 font-mono text-4xl text-center">{`<Hola Mundo />`}</h2>

          <p className="max-w-4xl px-5 mx-auto mt-4 font-mono text-xl text-center">
            Siempre he estado interesado en cómo funciona la tecnología y todo lo que la conforma. Desde cómo los
            personajes se mueven dentro de los videojuegos, hasta el funcionamiento de las redes sociales y los sitios
            web.
          </p>

          <p className="max-w-4xl px-5 mx-auto mt-8 font-mono text-xl text-center">
            Es por eso que decidí convertirme en programador fullstack. Capaz de construir aplicaciones, desde la parte
            visual hasta las bases de datos.
          </p>

          <div className="flex justify-center max-w-4xl mx-auto mt-5">
            <Link to="/sobre-mi" className="block px-5 py-2 rounded-full bg-secondary text-primary">
              ¡Conóceme más!
            </Link>
          </div>
        </div>
      </div>

      <div className="relative w-full py-24" id="dreams">
        <div className="container relative z-20 px-5">
          <h2 className="absolute bottom-0 w-full max-w-4xl py-4 mb-16 font-sans text-xl font-bold text-center transform -translate-x-1/2 rounded-full sm:px-16 sm:text-3xl sm:mb-12 md:text-5xl md:mb-8 bg-primary left-1/2 sm:py-7 text-secondary">
            ¡Codifiquemos juntos!
          </h2>
        </div>

        <div className="container relative z-20 mt-6">
          <Features
            features={home.features}
            options={{
              type: `carousel`,
              controls: true,
              perView: 1,
              focusAt: `center`,
            }}
          />
        </div>
      </div>

      <div className="w-full py-12 bg-primary">
        <div className="max-w-4xl px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary">Manejo de tecnologías como:</h2>

          <div className="grid grid-cols-2 gap-8 mt-8 md:grid-cols-4">
            <div className="text-center">
              <GrReactjs size="128" className="mx-auto text-secondary" />
              <h2 className="font-mono text-xl font-bold text-secondary">React / NextJS / Gatsby</h2>
            </div>
            <div className="text-center">
              <IoLogoNodejs size="128" className="mx-auto text-secondary" />
              <h2 className="font-mono text-xl font-bold text-secondary">NodeJS</h2>
            </div>
            <div className="text-center">
              <GrGraphQl size="128" className="mx-auto text-secondary" />
              <h2 className="font-mono text-xl font-bold text-secondary">GraphQL</h2>
            </div>
            <div className="text-center">
              <IoLogoWordpress size="128" className="mx-auto text-secondary" />
              <h2 className="font-mono text-xl font-bold text-secondary">WordPress</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-16 bg-secondary">
        <div className="max-w-4xl px-5 mx-auto">
          <h2 className="font-mono text-xl text-white">Trabajos recientes</h2>

          <div className="mt-6">
            {portfolios && (
              <Link to={`/portafolio/${portfolios[0].slug}/`} className="w-full rounded-lg">
                <div className="overflow-hidden rounded-lg h-88">
                  <Img
                    fluid={portfolios[0].cover.childImageSharp.fluid}
                    alt={`Portafolio: ${portfolios[0].title} | Daniel Esteves`}
                    className="block"
                    imgStyle={{ objectPosition: `top center` }}
                  />
                </div>
              </Link>
            )}

            <div className="grid grid-cols-2 gap-6 mt-6">
              {portfolios &&
                portfoliosArray(portfolios).map(portfolio => (
                  <Link to={`/portafolio/${portfolio.slug}/`} key={portfolio.id} className="w-full rounded-lg">
                    <div className="h-64 overflow-hidden rounded-lg">
                      <Img
                        fluid={portfolio.cover.childImageSharp.fluid}
                        alt={`Portafolio: ${portfolio.title} | Daniel Esteves`}
                        className="block"
                        imgStyle={{ objectPosition: `top center` }}
                      />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-16 bg-white">
        <div className="max-w-4xl px-5 mx-auto">
          <div className="grid items-center grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-5xl md:text-6xl text-secondary">
                Prueba mis Apps <span className="text-6xl uppercase md:text-7xl">gratis</span>
              </h2>
            </div>
            <div>
              <ul className="grid grid-cols-1 gap-8">
                {projects &&
                  projects.map(project => (
                    <li key={project.id}>
                      <Link
                        to={`/project/${project.slug}/`}
                        className="block p-4 transition-all duration-150 border rounded-md hover:shadow"
                      >
                        <h3 className="mb-2 text-xl font-bold text-secondary">{project.title}</h3>
                        <p className="text-sm text-gray-500">{project.sort}</p>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-12 bg-secondary">
        <div className="max-w-4xl px-5 mx-auto">
          <h2 className="font-mono text-xl text-center text-white">Chequea mi blog</h2>

          <div className="grid grid-cols-1 gap-6 my-8 md:grid-cols-2">
            {blogs &&
              blogs.map(blog => (
                <Link to={`/blog/${blog.slug}/`} key={blog.id} title={blog.title} className="w-full h-full rounded-lg">
                  <article className="h-full">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={`https://generator.opengraphimg.com/?title=${decodeURIComponent(
                          decodeURIComponent(blog.title),
                        )}&tags=${blog.tags
                          ?.map(({ name }) => name)
                          .join(
                            `,`,
                          )}&author=danestves&background=00C389FF&boxBackground=071D49FF&titleMargin=-mt-12&tagsSize=text-3xl&atSymbol=true&authorSize=text-3xl`}
                        alt={`${blog.title} | Daniel Esteves`}
                        className="block w-full"
                      />
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
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
      features {
        id
        title
        icon {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subtitle
      }
    }

    allStrapiPortfolios(limit: 5, sort: { fields: createdAt, order: [DESC] }) {
      nodes {
        id
        slug
        title
        cover {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    allStrapiProjects(limit: 2, sort: { fields: createdAt, order: [DESC] }) {
      nodes {
        id
        title
        slug
        sort
      }
    }

    allStrapiBlogs(limit: 2, sort: { fields: createdAt, order: DESC }) {
      nodes {
        id
        slug
        title
        tags {
          name
        }
      }
    }
  }
`;

export default IndexPage;
