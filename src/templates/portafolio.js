import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Markdown from "@danestves/react-markdown"
import Layout from "../components/layout"
import { CategoryIcon, TechnologyIcon, LinkIcon } from "../components"

export default ({ data }) => {
  const portfolio = data.strapiPortfolios

  return (
    <Layout>
      <div className="py-5 flex flex-wrap items-center">
        <div className="w-full md:w-1/2">
          <Img
            fluid={portfolio.cover.childImageSharp.fluid}
            alt={`Portafolio: ${portfolio.title} | Daniel Esteves`}
            className="block mx-auto rounded-lg max-w-lg"
          />

          <h1 className="text-4xl text-center font-medium leading-none mt-3 mb-6">
            {portfolio.title}
          </h1>
          <h2 className="text-2xl text-gray-700 leading-none font-light flex justify-center items-center mb-6">
            <CategoryIcon className="fill-current w-6 h-6 mr-3" /> Categoría:{" "}
            {portfolio.category.name}
          </h2>
          <h3 className="text-2xl text-gray-700 leading-none font-light flex justify-center items-center mb-8">
            <TechnologyIcon className="fill-current w-6 h-6 mr-3" />{" "}
            Tecnologías:{" "}
            {portfolio.technologies.map(item => (
              <div
                key={item.id}
                className="text-lg leading-none py-1 px-3 mx-1 first:ml-3 rounded-full border border-gray-700"
              >
                {item.name}
              </div>
            ))}
          </h3>

          <div className="flex justify-center items-center">
            <a
              href={portfolio.url}
              rel="noopener noreferrer"
              target="_blank"
              className="text-xl text-white leading-none bg-indigo-700 hover:bg-indigo-600 rounded px-5 py-2 flex items-center transition-all transition-250 transition-ease-in-out"
            >
              Ver Proyecto <LinkIcon className="fill-current w-6 h-6 ml-3" />
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <Markdown
            tagName="div"
            className="markdown py-5 text-lg text-gray-600 text-justify"
            content={portfolio.content}
            parser={{ html: true }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    strapiPortfolios(slug: { eq: $slug }) {
      title
      content
      cover {
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ogCover {
        childImageSharp {
          fluid(maxWidth: 1200, maxHeight: 628) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      category {
        name
      }
      technologies {
        id
        name
      }
      url
    }
  }
`
