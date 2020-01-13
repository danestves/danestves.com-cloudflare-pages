import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { default as Link } from "gatsby-plugin-transition-link/AniLink"
import { useTransition, animated, config } from "react-spring"

import { Fade, SEO, Layout } from "../components"

export default ({
  data: {
    allStrapiPortfolios: { nodes: portfoliosData },
  },
}) => {
  const [portfolios, setPortfolios] = useState([])
  const [filteredPortfolios, setFilteredPortfolios] = React.useState([])
  const portfoliosTransition = useTransition(
    filteredPortfolios,
    item => item.id,
    {
      from: { opacity: 0, transform: `scale(${0})`, transformOrigin: "bottom" },
      enter: { opacity: 1, transform: `scale(${1})` },
      leave: { opacity: 0, transform: `scale(${0})` },
      config: { ...config.wobbly, clamp: true },
    }
  )

  useEffect(() => {
    setPortfolios(portfoliosData)
    setFilteredPortfolios(portfoliosData)
  }, [])

  const filter = name => {
    if (name === "") {
      setFilteredPortfolios(portfolios)
    } else {
      const filterType = portfolios.filter(e => e.category.name === name)

      setFilteredPortfolios(filterType)
    }
  }

  return (
    <Layout>
      <SEO
        isTemplate
        title="Portafolio"
        description="Portafolio de Daniel Esteves para mostrar sus proyectos realizados en todo su trayecto como desarrollador web frontend. React, NextJS, Gatsby y WordPress."
      />

      <div className="mt-3 mb-5 text-right">
        <p className="mb-3 text-lg">Filtrar por:</p>
        <div className="relative inline-block w-64">
          <select
            onChange={e => filter(e.target.value)}
            className="block w-full px-4 py-2 pr-8 leading-tight bg-transparent border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
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
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <hr className="border-gray-400" />

      <div className="flex flex-wrap justify-center py-5">
        {portfoliosTransition.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={props}
                className="w-full px-3 my-3 sm:w-1/2 md:w-1/3 lg:w-1/4 transition-all transition-250"
              >
                <Link
                  to={`/portafolio/${item.slug}`}
                  className="block portfolio-link"
                  swipe
                  direction="down"
                  entryOffset={80}
                >
                  <Fade>
                    <Img
                      fluid={item.cover.childImageSharp.fluid}
                      className="w-full border rounded-lg shadow-xl portfolio-image transition-all transition-250 hover:shadow-2xl dark:shadow-white-xl dark:hover:shadow-white-2xl"
                    />

                    <div className="relative px-4 -mt-10">
                      <div className="flex flex-col bg-white border rounded-lg dark:bg-indigo-900 portfolio-meta transition-all transition-250">
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
              </animated.div>
            )
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Portafolios {
    allStrapiPortfolios(sort: { fields: [title], order: [ASC] }) {
      nodes {
        id
        slug
        title
        cover {
          childImageSharp {
            fluid(maxWidth: 300, maxHeight: 200) {
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
`
