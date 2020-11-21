// Dependencies
import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import ErrorPage from 'next/error'

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
  return <>{console.log(portfolio)}</>
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
