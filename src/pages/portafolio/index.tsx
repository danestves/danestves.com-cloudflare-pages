// Dependencies
import * as React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/dist/client/router'

// Components
import { SEO, Pagination } from '@/components'
import PortfolioCard from '@/components/Portfolio/Card'

// Interfaces
import { Portfolio } from '@/interfaces'

// Utils
import { getPortfolios } from '@/utils/api'

interface PortfolioPageProps {
  portfolios: Portfolio[]
  page: number
  count: number
}

const PortfolioPage: NextPage<PortfolioPageProps> = ({ portfolios, count, page }) => {
  // Hooks
  const router = useRouter()

  return (
    <>
      <SEO
        title="Portfolio"
        description="Portafolio de Daniel Esteves para mostrar sus proyectos realizados en todo su trayecto como desarrollador web frontend. React, NextJS, Gatsby y WordPress."
      />

      {portfolios && (
        <div className="w-full py-16">
          <div className="container px-5">
            <div className="grid grid-cols-1 gap-4 card-list sm:grid-cols-2 lg:grid-cols-4">
              {(portfolios as Portfolio[]).map((portfolio) => (
                <PortfolioCard
                  key={portfolio.id}
                  isSelected={router.query.slug === portfolio.slug}
                  {...portfolio}
                />
              ))}
            </div>

            <Pagination model="portafolio" count={count} page={page} limit={8} />
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1 } }) => {
  const start = +page === 1 ? 0 : (+page - 1) * 8

  const res = await getPortfolios(8, start)

  return {
    props: {
      portfolios: res?.portfolios || [],
      page: +page,
      count: res?.count || 0,
    },
  }
}

export default PortfolioPage
