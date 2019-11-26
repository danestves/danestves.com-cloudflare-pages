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
      <div className="flex flex-wrap items-center py-5">
        <div className="w-full px-2 md:w-1/2 md:px-5">
          <Img
            fluid={portfolio.cover.childImageSharp.fluid}
            alt={`Portafolio: ${portfolio.title} | Daniel Esteves`}
            className="block max-w-lg mx-auto rounded-lg"
          />

          <h1 className="mt-3 mb-6 text-4xl font-medium leading-none text-center">
            {portfolio.title}
          </h1>
          <h2 className="flex flex-wrap items-center justify-center mb-6 text-2xl font-light leading-none text-gray-700">
            <CategoryIcon className="w-6 h-6 mr-3 fill-current" /> Categoría:{" "}
            {portfolio.category.name}
          </h2>
          <h3 className="flex flex-wrap items-center justify-center mb-8 text-2xl font-light leading-none text-gray-700">
            <TechnologyIcon className="w-6 h-6 mr-3 fill-current" />{" "}
            Tecnologías:{" "}
            {portfolio.technologies.map(item => (
              <div
                key={item.id}
                className="px-3 py-1 mx-1 text-lg leading-none border border-gray-700 rounded-full first:ml-3"
              >
                {item.name}
              </div>
            ))}
          </h3>

          <div className="flex items-center justify-center">
            <a
              href={portfolio.url}
              rel="noopener noreferrer"
              target="_blank"
              className="flex items-center px-5 py-2 text-xl leading-none text-white bg-indigo-700 rounded hover:bg-indigo-600 transition-all transition-250 transition-ease-in-out"
            >
              Ver Proyecto <LinkIcon className="w-6 h-6 ml-3 fill-current" />
            </a>
          </div>
        </div>

        <div className="w-full px-2 md:w-1/2 md:px-5">
          <Markdown
            tagName="div"
            className="py-5 text-lg text-gray-600 markdown text-justify"
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
