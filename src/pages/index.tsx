// Dependencies
import * as React from 'react';
import { graphql, PageProps } from 'gatsby';

// Components
import { Layout, SEO, Logo, Emoji } from '../components';

// Types
import { BlogCardType } from '../types';

interface HomeProps extends PageProps {
  data: {
    strapiHome: JSON;
    allStrapiBlogs: [BlogCardType];
    allStrapiPortfolios: Array<unknown>;
  };
}

const IndexPage: React.FC<HomeProps> = ({ data: { strapiHome: home } }) => {
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
        <div className="container relative z-20">
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
