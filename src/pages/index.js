// Dependencies
import React from "react"
import { graphql } from "gatsby"
import { TransitionLink as Link } from "gatsby-plugin-transition-link/components/TransitionLink"
import Img from "gatsby-image"

// Helpers
import removeMarkdown from "../helpers/removeMarkdown"

// Components
import { Fade, Layout, SEO, Services } from "../components"

// Icons
import { InterfaceIcon, DesignSystemIcon, ClockIcon } from "../icons"

const IndexPage = ({
  data: { strapiHome, allStrapiBlogs, allStrapiPortfolios },
}) => {
  if (!strapiHome) return null

  return (
    <Layout>
      <SEO title="Inicio" isTemplate />

      <div className="flex flex-wrap items-center py-12">
        <div className="order-2 w-full md:w-3/5 md:order-1">
          <h1 className="mt-5 text-6xl font-bold leading-none text-center text-indigo-800 capitalize md:text-left md:mt-0 dark:text-gray-400">
            {strapiHome.name}
          </h1>
          <h2 className="text-3xl font-normal text-center text-gray-700 md:text-left dark:text-gray-500">
            {strapiHome.title}
          </h2>
          <p className="mt-3 text-xl text-center text-gray-600 md:text-left">
            {strapiHome.text}
          </p>

          <div className="flex flex-wrap mt-5">
            <div className="w-full my-2 md:w-1/2 md:pr-2 md:my-0">
              <Link
                to="/curriculum"
                className="block w-full px-8 py-2 text-xl font-semibold text-center text-indigo-700 capitalize transition-all duration-200 bg-transparent border border-indigo-700 rounded hover:bg-indigo-700 hover:text-white hover:border-transparent dark:text-gray-400 dark:border-gray-400 dark:hover:bg-gray-400 dark:hover:text-indigo-700"
              >
                curriculum
              </Link>
            </div>
            <div className="w-full my-2 md:w-1/2 md:pl-2 md:my-0">
              <Link
                to="/contacto"
                className="block w-full px-8 py-2 text-xl font-semibold text-center text-white capitalize transition-all duration-200 bg-indigo-700 rounded hover:bg-indigo-600"
              >
                contáctame
              </Link>
            </div>
          </div>
        </div>

        <div className="order-1 w-full md:w-2/5 md:order-2">
          <Img
            fluid={strapiHome.image.childImageSharp.fluid}
            alt="Daniel Esteves"
            className="block object-cover object-center max-w-sm mx-auto transition-all duration-200 rounded-full shadow-2xl profile-photo"
          />
        </div>
      </div>

      <h2 className="mt-5 mb-12 text-5xl font-medium leading-none text-center text-indigo-800 dark:text-gray-300">
        ¿Cómo haré realidad tu sueño?
      </h2>

      <div className="flex flex-wrap items-center mb-10">
        <div className="order-2 w-full my-3 md:w-3/5 md:order-1">
          <h3 className="mb-5 text-4xl font-medium leading-none text-center text-indigo-800 md:text-left dark:text-gray-300">
            Interfaces limpias
          </h3>

          <p className="mb-5 text-2xl text-center text-gray-700 md:text-left md:mb-0 dark:text-gray-500">
            Al momento de realizar los prototipos de tus diseños se harán con
            base en estándares y accesibilidad con el cual tu sitio se verá muy
            limpio y rápido.
          </p>
        </div>
        <div className="order-1 w-full my-3 md:w-2/5 md:order-2">
          <DesignSystemIcon className="w-56 h-56 mx-auto mb-5 d-block md:mb-0" />
        </div>

        <div className="order-4 w-full my-3 md:w-2/5 md:order-3">
          <InterfaceIcon className="w-56 h-56 mx-auto mb-5 d-block md:mb-0" />
        </div>
        <div className="order-4 w-full my-3 md:w-3/5 md:order-3">
          <h3 className="mb-5 text-4xl font-medium leading-none text-center text-indigo-800 md:text-right dark:text-gray-300">
            Adaptable a todos los dispositivos
          </h3>

          <p className="mb-5 text-2xl text-center text-gray-700 md:text-right md:mb-0 dark:text-gray-500">
            Todos los diseños y desarrollos que realizo son y serán adaptables a
            dispositivos para que cualquiera pueda entrar a su web o aplicación
            y verla adaptada con completo funcionamiento en ese dispositivo.
          </p>
        </div>
      </div>

      <h2 className="mt-5 text-4xl font-bold leading-none text-center text-indigo-800 capitalize dark:text-gray-400">
        Habilidades
      </h2>

      <Services
        services={strapiHome.skills}
        options={{
          type: "carousel",
          controls: true,
          perView: 3,
          focusAt: "center",
          breakpoints: {
            768: {
              perView: 2,
            },
            640: {
              perView: 1,
            },
          },
        }}
      />

      <h2 className="mt-5 text-4xl font-bold leading-none text-center text-indigo-800 capitalize dark:text-gray-400">
        Últimos Portafolios
      </h2>

      <div className="flex flex-wrap justify-center py-5">
        {allStrapiPortfolios &&
          allStrapiPortfolios.nodes.map(item => (
            <div
              key={item.id}
              className="w-full px-3 my-3 transition-all duration-200 sm:w-1/2 md:w-1/3"
            >
              <Fade>
                <Link
                  to={`/portafolio/${item.slug}`}
                  className="block portfolio-link"
                  direction="down"
                >
                  <Fade>
                    <Img
                      fluid={item.cover.childImageSharp.fluid}
                      className="w-full transition-all duration-200 border rounded-lg shadow-xl portfolio-image hover:shadow-2xl"
                      imgStyle={{ objectPosition: "top center" }}
                    />

                    <div className="relative px-4 -mt-10">
                      <div className="flex flex-col transition-all duration-200 bg-white border rounded-lg dark:bg-gray-700 portfolio-meta">
                        <h2 className="my-2 text-2xl leading-none text-center lg:text-xl">
                          {item.title}
                        </h2>
                        <h3 className="mb-2 text-xl font-light leading-none text-center text-gray-500 lg:text-lg">
                          {item.category.name}
                        </h3>
                      </div>
                    </div>
                  </Fade>
                </Link>
              </Fade>
            </div>
          ))}
      </div>

      <h2 className="mt-5 text-4xl font-bold leading-none text-center text-indigo-800 capitalize dark:text-gray-400">
        Último Blog
      </h2>

      {allStrapiBlogs &&
        allStrapiBlogs.nodes.map(blog => (
          <Fade key={blog.id}>
            <Link
              to={`/blog/${blog.slug}`}
              className="flex flex-wrap items-stretch my-5 overflow-hidden transition-all duration-200 bg-white border border-transparent rounded-lg shadow hover:border-indigo-900 dark:hover:border-white dark:bg-gray-700 hover:shadow-lg dark:shadow-white dark:hover:shadow-white-lg"
            >
              <Img
                fluid={blog.cover.childImageSharp.fluid}
                className="w-full transition-all duration-200 sm:w-2/5 lg:w-1/3 xl:w-1/5"
              />

              <div className="w-full px-4 py-5 transition-all duration-200 sm:w-3/5 lg:w-2/3 xl:w-4/5">
                <div className="flex flex-col justify-around h-full">
                  <h2 className="my-2 text-2xl leading-none text-center lg:text-3xl xl:text-left">
                    {blog.title}
                  </h2>

                  <span className="flex justify-center mt-2 text-gray-600 xl:justify-start">
                    <ClockIcon className="w-6 h-6 mr-2 fill-current" />{" "}
                    {blog.createdAt}
                  </span>

                  <p className="mt-4 font-light text-gray-500 lg:text-2xl xl:text-xl">
                    {removeMarkdown(blog.body.substr(0, 154))}...
                  </p>
                </div>
              </div>
            </Link>
          </Fade>
        ))}
    </Layout>
  )
}

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

    allStrapiBlogs(limit: 1, sort: { fields: createdAt, order: DESC }) {
      nodes {
        id
        slug
        cover {
          childImageSharp {
            fluid(maxWidth: 300, maxHeight: 200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        createdAt(fromNow: true, locale: "es")
        body
      }
    }
  }
`

export default IndexPage
