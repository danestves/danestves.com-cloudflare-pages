// Dependencies
import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import ErrorPage from 'next/error'
import Markdown from 'react-markdown'
import removeMarkdown from 'remove-markdown'
import { AiFillTags, AiOutlineLink } from 'react-icons/ai'
import { BiCodeAlt } from 'react-icons/bi'

// Components
import { SEO, CallToAction } from '@/components'

// Interfaces
import { Portfolio } from '@/interfaces'

// Utils
import { getStrapiURL, getPortfolioData } from '@/utils/api'

type DynamicPortfolioProps = {
  portfolio: Portfolio | null
}

const DynamicPortfolio: React.FC<DynamicPortfolioProps> = ({ portfolio }) => {
  // Hooks
  const router = useRouter()

  // Render

  /**
   * Check if the required data was provided
   */
  if ((!router.isFallback && !portfolio) || !portfolio) {
    return <ErrorPage statusCode={404} />
  }

  /**
   * Loading screen (only possible in preview mode)
   */
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  /**
   * Load content of the portfolio when data exist
   */
  return (
    <>
      <SEO
        title={portfolio.title}
        description={`${removeMarkdown(portfolio.body).substr(0, 157)}...`}
        shareImage={portfolio.ogCover}
      />

      <div className="flex items-center w-full min-h-screen">
        <div className="container px-5 pt-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-center text-white">{portfolio.title}</h1>

            <div className="mt-4 space-y-6">
              <div>
                <h2 className="text-lg text-white">
                  <AiFillTags className="inline-block mr-1 text-primary" />
                  <b>Categoría:</b> {portfolio.category.name}
                </h2>
              </div>

              <div>
                <h2 className="text-lg text-white">
                  <BiCodeAlt className="inline-block mr-1 text-primary" />
                  <b>Tecnologías:</b> {portfolio.technologies.map((t) => t.name).join(`, `)}
                </h2>
              </div>

              <div>
                <a
                  href={portfolio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded text-secondary bg-primary"
                >
                  Ver Proyecto <AiOutlineLink className="inline-block ml-1 text-secondary" />
                </a>
              </div>
            </div>

            <Markdown
              className="max-w-full py-5 text-lg prose text-justify text-primary"
              source={portfolio.body}
              escapeHtml={false}
            />

            <hr className="mt-3 mb-8 border-primary" />

            <p className="text-center text-gray-500">
              Este portafolio tiene como objetivo mostrar trabajos previamente realizados a través
              de enlaces externos. El desarrollador no se hace responsable por enlaces inaccesibles
              o trabajos modificados posterior a su entrega. Una vez entregado el trabajo encargado.
              queda a responsabilidad total del cliente el mantenimiento y buen uso del servicio
              solicitado originalmente.
            </p>
          </div>
        </div>
      </div>

      <CallToAction />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all pages from Strapi
  const portfolios = await (await fetch(getStrapiURL('/portfolios'))).json()
  const paths = portfolios.map((portfolio: Portfolio) => {
    // Decompose the slug that was saved in Strapi
    const slugArray = portfolio.slug.split('__')

    return {
      params: { slug: slugArray },
    }
  })

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Find the page data for the current slug
  let chainedSlugs

  if (params == {} || !params?.slug) {
    // To get the homepage, find the only page where slug is an empty string
    chainedSlugs = ``
  } else {
    // Otherwise find a page with a matching slug
    // Recompose the slug that was saved in Strapi
    // eslint-disable-next-line
    // @ts-ignore
    chainedSlugs = params.slug.join('__')
  }
  // Fetch pages. Include drafts if preview mode is on
  const portfolioData = await getPortfolioData(chainedSlugs)

  if (portfolioData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const data = portfolioData

  return {
    props: {
      portfolio: data,
    },
  }
}

export default DynamicPortfolio
