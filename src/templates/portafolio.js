import React, { useState } from "react"
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
  const [collapsed, setCollapsed] = useState(false)
  const portfolio = data.strapiPortfolios

  const disableAnchorHref = e => {
    e.preventDefault()
  }

  return (
    <Layout>
      <SEO
        isTemplate
        title={portfolio.title}
        description={`${removeMD(portfolio.body).substr(0, 157)}...`}
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
            content: `https://danestves.com${portfolio.ogCover.publicURL}`,
          },
          {
            property: "og:url",
            content: window.location.href,
          },
          {
            name: "twitter:image",
            content: `https://danestves.com${portfolio.ogCover.publicURL}`,
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
            className="block max-w-lg mx-auto rounded-lg cursor-pointer"
            style={{ maxHeight: collapsed ? `100%` : 340 }}
            imgStyle={{ objectPosition: `top center` }}
            onClick={() => setCollapsed(!collapsed)}
          />
          <small className="block text-center">
            Click en la imagen para ver más. Puedes ver la imagen original{" "}
            <a
              href={portfolio.cover.publicURL}
              target="_blank"
              className="font-bold underline"
              rel="noopener noreferrer"
            >
              aquí
            </a>
          </small>

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

          <div className="flex flex-col items-center justify-center">
            <a
              href={portfolio.url}
              rel="noopener noreferrer"
              target="_blank"
              type="button"
              className={`flex items-center px-5 py-2 text-xl leading-none text-white bg-indigo-700 rounded hover:bg-indigo-600 ${
                portfolio.isActive ? "" : "opacity-50 cursor-not-allowed"
              } transition-all transition-250 transition-ease-in-out`}
              disabled={!portfolio.isActive}
              onClick={portfolio.isActive ? null : disableAnchorHref}
            >
              Ver Proyecto <LinkIcon className="w-6 h-6 ml-3 fill-current" />
            </a>

            {portfolio.isActive ? (
              ""
            ) : (
              <p className="max-w-xs mx-auto mt-4 text-sm text-center text-red-700">
                Este proyecto ha dejado de ser accesible debido a que su
                contrato de hospedaje web no ha sido renovado por su responsable
                designado.
              </p>
            )}
          </div>
        </div>

        <div className="w-full px-2 md:w-1/2 md:px-5">
          <Markdown
            className="py-5 text-lg text-justify text-gray-600 markdown markdown-content"
            source={portfolio.body}
            renderers={markdownRenderers}
            escapeHtml={false}
          />
        </div>
      </div>

      <hr className="my-8 border-gray-400 dark:border-gray-700" />

      <p className="text-center text-gray-500 dark:text-gray-700">
        Este portafolio tiene como objetivo mostrar trabajos previamente
        realizados a través de enlaces externos. El desarrollador no se hace
        responsable por enlaces inaccesibles o trabajos modificados posterior a
        su entrega. Una vez entregado el trabajo encargado. queda a
        responsabilidad total del cliente el mantenimiento y buen uso del
        servicio solicitado originalmente.
      </p>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    strapiPortfolios(slug: { eq: $slug }) {
      title
      body
      cover {
        childImageSharp {
          fluid(maxWidth: 700, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
        publicURL
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
      isActive
    }
  }
`
