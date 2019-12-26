import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { default as Link } from "gatsby-plugin-transition-link/AniLink"
import { useTransition, animated, config } from "react-spring"

import Layout from "../components/layout"
import { Fade } from "../components"

export default ({ data }) => {
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
    const portfoliosData = data.allStrapiPortfolios.nodes

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
      <div className="flex flex-wrap justify-center py-5">
        <button
          className="px-5 py-2 m-2 text-black bg-white rounded-full shadow dark:text-white dark:bg-indigo-900 dark:shadow-white"
          onClick={() => filter("")}
        >
          Todos
        </button>
        <button
          className="px-5 py-2 m-2 text-black bg-white rounded-full shadow dark:text-white dark:bg-indigo-900 dark:shadow-white"
          onClick={() => filter("Educativa")}
        >
          Educativa
        </button>
        <button
          className="px-5 py-2 m-2 text-black bg-white rounded-full shadow dark:text-white dark:bg-indigo-900 dark:shadow-white"
          onClick={() => filter("Diseño Web")}
        >
          Diseño Web
        </button>
        <button
          className="px-5 py-2 m-2 text-black bg-white rounded-full shadow dark:text-white dark:bg-indigo-900 dark:shadow-white"
          onClick={() => filter("Moda")}
        >
          Moda
        </button>
        <button
          className="px-5 py-2 m-2 text-black bg-white rounded-full shadow dark:text-white dark:bg-indigo-900 dark:shadow-white"
          onClick={() => filter("Gastronomía")}
        >
          Gastronomía
        </button>
        <button
          className="px-5 py-2 m-2 text-black bg-white rounded-full shadow dark:text-white dark:bg-indigo-900 dark:shadow-white"
          onClick={() => filter("Medicinal")}
        >
          Medicinal
        </button>
        <button
          className="px-5 py-2 m-2 text-black bg-white rounded-full shadow dark:text-white dark:bg-indigo-900 dark:shadow-white"
          onClick={() => filter("Tienda Virtual")}
        >
          Tienda Virtual
        </button>
        <button
          className="px-5 py-2 m-2 text-black bg-white rounded-full shadow dark:text-white dark:bg-indigo-900 dark:shadow-white"
          onClick={() => filter("Informativa")}
        >
          Informativa
        </button>
        <button
          className="px-5 py-2 m-2 text-black bg-white rounded-full shadow dark:text-white dark:bg-indigo-900 dark:shadow-white"
          onClick={() => filter("Inmobiliaria")}
        >
          Inmobiliaria
        </button>
        <button
          className="px-5 py-2 m-2 text-black bg-white rounded-full shadow dark:text-white dark:bg-indigo-900 dark:shadow-white"
          onClick={() => filter("Diseño")}
        >
          Diseño
        </button>
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

      {/* <div className="flex flex-wrap justify-center py-5">
        {data
          ? filteredPortfolios.map(item => (
              <Link
                to={`/portafolio/${item.slug}`}
                key={item.id}
                className="w-full px-3 my-3 sm:w-1/2 md:w-1/3 lg:w-1/4 portfolio-link"
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
            ))
          : ""}
      </div> */}
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
