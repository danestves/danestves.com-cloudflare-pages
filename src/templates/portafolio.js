import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Markdown from "react-markdown"
import removeMD from "remove-markdown"
import { window } from "browser-monads"

import { Layout, SEO, Blockquote, MarkdownLink } from "../components"
import { CategoryIcon, TechnologyIcon, LinkIcon } from "../icons"

const markdownRenderers = {
  blockquote: Blockquote,
  link: MarkdownLink,
}

export default ({ data }) => {
  const portfolio = data.strapiPortfolios

  return (
    <Layout>
      <SEO
        isTemplate
        title={portfolio.title}
        description={`${removeMD(portfolio.content).substr(0, 157)}...`}
        meta={[
          {
            name: "language",
            content: "ES",
          },
          {
            name: "url",
            content: window.location.href,
          },
          {
            name: "date",
            content: portfolio.createdAt,
            schema: "YYYY-MM-DD",
          },
          {
            name: "identifier",
            content: "0-2345-6634-6",
            scheme: "ISBN",
          },
          {
            property: "og:image",
            content: portfolio.ogCover.publicURL,
          },
          {
            property: "og:url",
            content: window.location.href,
          },
          {
            name: "twitter:image",
            content: portfolio.ogCover.publicURL,
          },
          {
            name: "twitter:image:alt",
            content: portfolio.title,
          },
        ]}
      />

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
            className="py-5 text-lg text-justify text-gray-600 markdown markdown-content"
            source={portfolio.content}
            renderers={markdownRenderers}
            escapeHtml={false}
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
        publicURL
      }
      category {
        name
      }
      technologies {
        id
        name
      }
      url
      createdAt(formatString: "YYYY-MM-DD")
    }
  }
`
