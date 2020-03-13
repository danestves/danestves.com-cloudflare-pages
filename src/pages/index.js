import React from "react"
import { graphql } from "gatsby"
import { TransitionLink as Link } from "gatsby-plugin-transition-link/components/TransitionLink"
import Img from "gatsby-image"

import { Layout, SEO, Services } from "../components"
import { InterfaceIcon, DesignSystemIcon } from "../icons"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Inicio" isTemplate />

    <div className="flex flex-wrap items-center py-12">
      <div className="order-2 w-full md:w-3/5 md:order-1">
        <h1 className="mt-5 text-6xl font-bold leading-none text-center text-indigo-800 md:text-left md:mt-0 dark:text-gray-400">
          Daniel Esteves
        </h1>
        <h2 className="text-3xl font-normal text-center text-gray-700 md:text-left dark:text-gray-500">
          Desarrollador web frontend
        </h2>
        <p className="mt-3 text-center text-gray-600 text-1xl md:text-left">
          Desarrollando sitios web utilizando WordPress, React, Gatsby, NextJS y
          mucho más. Listo para realizar tu sueño.
        </p>

        <div className="flex flex-wrap mt-5">
          <div className="w-full my-2 md:w-1/2 md:pr-2 md:my-0">
            <Link
              to="/curriculum"
              className="block w-full px-8 py-2 text-xl font-semibold text-center text-indigo-700 capitalize bg-transparent border border-indigo-700 rounded hover:bg-indigo-700 hover:text-white hover:border-transparent transition-all duration-200 dark:text-gray-400 dark:border-gray-400 dark:hover:bg-gray-400 dark:hover:text-indigo-700"
            >
              curriculum
            </Link>
          </div>
          <div className="w-full my-2 md:w-1/2 md:pl-2 md:my-0">
            <Link
              to="/contacto"
              className="block w-full px-8 py-2 text-xl font-semibold text-center text-white capitalize bg-indigo-700 rounded hover:bg-indigo-600 transition-all duration-200"
            >
              contáctame
            </Link>
          </div>
        </div>
      </div>

      <div className="order-1 w-full md:w-2/5 md:order-2">
        <Img
          fluid={data.profile.childImageSharp.fluid}
          alt="Daniel Esteves"
          className="block object-cover object-center max-w-sm mx-auto rounded-full shadow-2xl transition-all duration-200 profile-photo"
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
          Al momento de realizar los prototipos de tus diseños se harán con base
          en estándares y accesibilidad con el cual tu sitio se verá muy limpio
          y rápido.
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
          dispositivos para que cualquiera pueda entrar a su web o aplicación y
          verla adaptada con completo funcionamiento en ese dispositivo.
        </p>
      </div>
    </div>

    <Services
      services={data.allStrapiSkills.nodes}
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
  </Layout>
)

export const query = graphql`
  query Services {
    profile: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    allStrapiSkills {
      nodes {
        icon
        title
        content
      }
    }
  }
`

export default IndexPage
