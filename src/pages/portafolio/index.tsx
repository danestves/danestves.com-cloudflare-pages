// Dependencies
import * as React from 'react'
import { NextPage } from 'next'
import Image from 'graphcms-image'
import removeMarkdown from 'markdown-to-text'

// Components
import { SEO, Pagination } from '@/components'

// Generated
import { usePortfoliosQuery, PageInfo } from '@/generated/graphql'

// Queries
import GET_PORTFOLIOS from '@/graphql/portfolios.query'

const PortfolioPage: NextPage = () => {
  const [state, setState] = React.useState({
    currentPage: 1,
    pageSize: 4,
    totalPages: 0,
  })

  /**
   * Get initial query variables
   */
  const getPageQueryVariables = (): { first: number; skip: number } => {
    return { first: state.pageSize, skip: (state.currentPage - 1) * state.pageSize }
  }

  const { data, loading, error, fetchMore } = usePortfoliosQuery({
    variables: getPageQueryVariables(),
  })

  if (loading) return <p>Loading Portfolios...</p>
  if (error) return <p>Error: ${error.message}</p>

  const count = data?.count.aggregate.count
  const pageInfo = data?.portfolios.pageInfo
  const portfolios = data?.portfolios.edges

  return (
    <>
      <SEO
        title="Portfolio"
        description="Portafolio de Daniel Esteves para mostrar sus proyectos realizados en todo su trayecto como desarrollador web frontend. React, NextJS, Gatsby y WordPress."
      />

      <div className="container px-5 space-y-24">
        {portfolios?.map(({ node: portfolio }) => (
          <article
            key={portfolio.id}
            className="grid items-center grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg group-focus:shadow-lg group-hover:-translate-y-1 group-focus:-translate-y-1">
              <Image
                // eslint-disable-next-line
                // @ts-ignore
                image={portfolio.cover}
                maxWidth={700}
                outerWrapperClassName="w-full"
                alt={portfolio.title}
              />
            </div>
            <div>
              <h2 className="text-4xl leading-tight text-white">{portfolio.title}</h2>
              <p className="text-white">{removeMarkdown(portfolio.content.slice(0, 250))}...</p>
            </div>
          </article>
        ))}

        <Pagination
          state={state}
          query={GET_PORTFOLIOS}
          variables={getPageQueryVariables()}
          setState={setState}
          fetchMore={fetchMore}
          count={count || 0}
          pageInfo={pageInfo as PageInfo}
        />
      </div>
    </>
  )
}

export default PortfolioPage
