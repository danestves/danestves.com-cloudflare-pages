import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import { Fade } from "../components"

export default ({ data }) => (
  <Layout>
    {console.log(data.allStrapiPortfolios)}
    <div className="flex flex-wrap justify-center py-5">
      {data
        ? data.allStrapiPortfolios.nodes.map(item => (
            <Fade className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 my-3 px-3">
              <Img
                fluid={item.cover.childImageSharp.fluid}
                className="w-full rounded-lg shadow-2xl"
              />

              <div className="relative -mt-10 px-4">
                <div className="bg-white rounded-lg flex flex-col">
                  <h2 className="text-2xl lg:text-xl text-center leading-none my-2">
                    {item.title}
                  </h2>
                  <h3 className="text-xl lg:text-lg text-center leading-none text-gray-400 font-light mb-2">
                    {item.category.name}
                  </h3>
                </div>
              </div>
            </Fade>
          ))
        : ""}
    </div>
  </Layout>
)

export const query = graphql`
  query Portafolio {
    allStrapiPortfolios(sort: { fields: [title], order: [ASC] }) {
      nodes {
        id
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
