import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Coding,
  Services,
  InterfaceIcon,
  DesignSystemIcon,
} from "../components"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />

    <div className="flex flex-wrap items-center py-12">
      <div className="w-full md:w-3/5 order-2 md:order-1">
        <h1 className="text-6xl text-indigo-800 leading-none font-bold text-center md:text-left mt-5 md:mt-0">
          Daniel Esteves
        </h1>
        <h2 className="text-3xl font-normal text-gray-700 text-center md:text-left">
          Desarrollador web frontend
        </h2>
        <p className="text-1xl mt-3 text-gray-600 text-center md:text-left">
          Desarrollando sitios web utilizando WordPress, React, Gatsby, NextJS y
          mucho más. Listo para realizar tu sueño.
        </p>

        <div className="flex mt-5">
          <Link
            to="/curriculum"
            className="w-1/2 mr-2 text-xl bg-transparent hover:bg-indigo-700 text-indigo-700 hover:text-white text-center font-semibold py-2 px-8 border border-indigo-700 hover:border-transparent rounded capitalize transition-colors transition-300 transition-linear"
          >
            curriculum
          </Link>

          <Link
            to="/contacto"
            className="w-1/2 ml-2 text-xl bg-indigo-700 hover:bg-indigo-600 text-white text-center font-semibold py-2 px-8 rounded capitalize transition-colors transition-300 transition-linear"
          >
            contactame
          </Link>
        </div>
      </div>

      <div className="w-full md:w-2/5 order-1 md:order-2">
        <Coding className="w-64 h-64 mx-auto drop-shadow" />
      </div>
    </div>

    <h2 className="text-5xl leading-none text-center text-indigo-800 font-medium mt-5 mb-12">
      ¿Cómo haré realidad tu sueño?
    </h2>

    <div className="flex flex-wrap items-center mb-10">
      <div className="w-full md:w-3/5 order-2 md:order-1">
        <h3 className="text-4xl leading-none text-indigo-800 font-medium mb-5">
          Interfaces limpias
        </h3>

        <p className="text-2xl text-gray-700 mb-5 md:mb-0">
          Al momento de realizar los prototipos de tus diseños se harán en base
          a estándares y accesibilidad con el cual tu sitio se verá muy limpio y
          rápido.
        </p>
      </div>
      <div className="w-full md:w-2/5 order-1 md:order-2">
        <DesignSystemIcon className="w-56 h-56 d-block mx-auto mb-5 md:mb-0" />
      </div>

      <div className="w-full md:w-2/5 order-4 md:order-3">
        <InterfaceIcon className="w-56 h-56 d-block mx-auto mb-5 md:mb-0" />
      </div>
      <div className="w-full md:w-3/5 order-4 md:order-3">
        <h3 className="text-4xl leading-none text-indigo-800 text-right font-medium mb-5">
          Adaptable a todos los dispositivos
        </h3>

        <p className="text-2xl text-gray-700 text-right mb-5 md:mb-0">
          Al momento de realizar los prototipos de tus diseños se harán en base
          a estándares de diseño y accesibilidad con el cual el diseño de tu
          sitio se verá muy limpio y rápido.
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
