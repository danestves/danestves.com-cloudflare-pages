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

      <div className="w-full py-16">
        <div className="container px-5">
          {/* {loading && (
            <div className="grid grid-cols-1 gap-4 card-list sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8).keys()].map((key) => (
                <div
                  key={key}
                  className="relative w-full mx-auto overflow-hidden bg-black border rounded-md shadow bg-opacity-40"
                >
                  <div className="flex flex-col animate-pulse">
                    <div>
                      <div className="w-full h-48" />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-center px-5 space-y-4 transition duration-150 bg-opacity-50 bg-secondary backdrop-blur">
                      <div className="w-3/4 h-6 mx-auto rounded bg-primary" />

                      <div className="space-y-2">
                        <div className="h-4 mx-auto rounded bg-primary" />
                        <div className="w-5/6 h-4 mx-auto rounded bg-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )} */}

          {portfolios && (
            <>
              <div className="grid grid-cols-1 gap-4 card-list sm:grid-cols-2 lg:grid-cols-4">
                {(portfolios as Portfolio[]).map((portfolio) => (
                  <PortfolioCard
                    key={portfolio.id}
                    isSelected={router.query.slug === portfolio.slug}
                    {...portfolio}
                  />
                  // <Link
                  //   key={portfolio.id}
                  //   href={`/portafolio/${portfolio.slug}`}
                  //   className="relative block w-full overflow-hidden rounded-md shadow"
                  // >
                  //   <div className="flex flex-col">
                  //     <div>
                  //       <Media media={portfolio.ogCover} width={320} height={192} />
                  //     </div>

                  //     <div className="absolute inset-0 flex flex-col justify-center px-5 -m-1 space-y-2 transition duration-150 bg-opacity-60 group bg-secondary backdrop-blur hover:bg-opacity-50 hover:backdrop-blur-hover">
                  //       <h2 className="text-2xl font-bold text-center text-white transition duration-300 transform scale-90 group-hover:scale-110">
                  //         {portfolio.title}
                  //       </h2>

                  //       <div className="space-y-2 transition-all duration-300 transform scale-90 group-hover:space-y-0 group-hover:scale-110 group-hover:mt-4">
                  //         <h3 className="text-center text-white transition-all duration-300 group-hover:text-sm">
                  //           <AiFillTags className="inline-block mr-1" />
                  //           Categoría: {portfolio.category.name}
                  //         </h3>

                  //         <h3 className="text-center text-white transition-all duration-300 group-hover:text-sm">
                  //           <BiCodeAlt className="inline-block mr-1" />
                  //           <b>Tecnologías:</b> {portfolio.technologies.map((t) => t.name).join(`, `)}
                  //         </h3>
                  //         <div className="w-5/6 h-4 rounded bg-light-blue-400" />
                  //       </div>
                  //     </div>
                  //   </div>
                  // </Link>
                ))}
              </div>

              <Pagination model="portafolio" count={count} page={page} />
            </>
          )}
        </div>
      </div>
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
