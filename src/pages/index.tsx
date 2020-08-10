// Dependencies
import * as React from 'react';
import { graphql, PageProps, Link } from 'gatsby';
import { IoLogoNodejs, IoLogoWordpress } from 'react-icons/io';
import { GrReactjs, GrGraphQl } from 'react-icons/gr';
import Img from 'gatsby-image';

// Components
import { Layout, SEO, Logo, Emoji } from '../components';

// Types
import { PortfolioCardType, ProjectCardType, BlogCardType } from '../types';

interface HomeProps extends PageProps {
  data: {
    strapiHome: JSON;
    allStrapiPortfolios: {
      nodes: [PortfolioCardType];
    };
    allStrapiProjects: {
      nodes: [ProjectCardType];
    };
    allStrapiBlogs: {
      nodes: [BlogCardType];
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
  const portfoliosArray = (data: [PortfolioCardType]): Array<PortfolioCardType> => {
    return data.slice(1);
  };

  // Render
  if (!home) return null;

  return (
    <Layout>
      <SEO title="Inicio" isTemplate />

      <div className="relative flex items-center py-20" id="hero">
        <div className="container z-20 grid items-center grid-cols-12 px-5">
          <div className="col-span-12 md:col-span-5">
            <Logo className="w-64 h-64 mx-auto text-primary" />
          </div>
          <div className="col-span-12 md:col-span-7">
            <h1 className="mb-2 text-6xl font-bold leading-none text-primary">Daniel Esteves</h1>
            <h2 className="font-mono text-xl text-primary">Programador web fullstack en JavaScript</h2>
          </div>
        </div>
      </div>

      <div className="container relative z-10 px-5 pb-32 -mt-24">
        <img
          src="/me.jpeg"
          alt="Daniel Esteves"
          className="z-30 w-48 h-48 mx-auto border-white rounded-full border-10"
        />

        <h2 className="mt-4 font-mono text-4xl text-center">{`<Hola Mundo />`}</h2>

        <p className="max-w-4xl px-5 mx-auto mt-4 font-mono text-xl">
          Desde muy niño he estado interesado en las computadoras comenzando desde los videojuegos, cada vez que jugaba
          sentía una necesidad de saber cómo eso está funcionando y cómo mi personaje hace cualquier movimiento;
          probando cada día más y más juegos me empezó a interesar cómo se pueden hacer las gráficas del juego y la
          interactividad contra el usuario.
        </p>

        <p className="max-w-4xl px-5 mx-auto mt-8 font-mono text-xl">
          Al llegar a la secundaria empecé a investigar sobre las computadoras y me empezó a interesar cómo las webs son
          construidas sobre todos las redes sociales, me gustaba la idea de que cuando un usuario le seleccionaba un
          menú se mostraban más opciones y animaciones, y eso fue lo que me enamoró del desarrollo web.
        </p>

        <p className="max-w-4xl px-5 mx-auto mt-8 font-mono text-xl">
          Comencé hace cinco años a trabajar y aprender desde el frontend, la parte visual de la web; hoy en día me
          considero un fullstack ya que gracias a el conocimiento que he obtenido puedo construir aplicaciones desde las
          vistas hasta las bases de datos y rutas. Me gusta aprender cada día más, integrar nuevas tecnologías y
          contribuir a nuevos proyectos para mejorar la productividad.
        </p>

        <p className="max-w-4xl px-5 mx-auto mt-8 font-mono text-xl text-right">
          - Los veo en el código <Emoji>👨‍💻</Emoji>
        </p>
      </div>

      <div className="relative w-full py-24" id="dreams">
        <div className="container relative z-20 px-5">
          <h2 className="absolute bottom-0 w-full max-w-4xl py-4 mb-16 font-sans text-xl font-bold text-center transform -translate-x-1/2 rounded-full sm:px-16 sm:text-3xl sm:mb-12 md:text-5xl md:mb-8 bg-primary left-1/2 sm:py-7 text-secondary">
            ¡Haré tus ideas realidad!
          </h2>
        </div>

        <div className="container relative z-20 mt-6">
          <h2 className="font-sans text-4xl font-bold text-center text-primary">
            Interfaces limpias y <br /> adaptables en cualquier dispositivo
          </h2>

          <img
            src="/interface.png"
            alt="Interfaces limpias y adaptables en cualquier dispositivo"
            className="mx-auto mt-8"
          />

          <p className="w-full max-w-4xl px-5 mx-auto mt-12 font-mono text-xl text-center text-primary">
            Diseños modernos y adaptables a cualquier dispositivo, que logran una experiencia única, mucho más limpia y
            rápida.
          </p>
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

          <div className="grid grid-cols-1 gap-6 my-8 md:grid-cols-3">
            {blogs &&
              blogs.map(blog => (
                <Link to={`/blog/${blog.slug}/`} key={blog.id} className="w-full h-full rounded-lg">
                  <article className="h-full">
                    <div className="overflow-hidden rounded-lg">
                      <Img
                        fluid={blog.ogCover.childImageSharp.fluid}
                        alt={`${blog.title} | Daniel Esteves`}
                        className="block"
                        imgStyle={{ objectPosition: `top center` }}
                      />
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </div>
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

    allStrapiPortfolios(limit: 5, sort: { fields: createdAt, order: [DESC] }) {
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
        title
      }
    }
  }
`;

export default IndexPage;
