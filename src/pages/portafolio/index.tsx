// Dependencies
import * as React from 'react'
import { NextPage } from 'next'
import { AiFillTags } from 'react-icons/ai'
import { BiCodeAlt } from 'react-icons/bi'

// Components
import { SEO, Link, Media, Pagination } from '@/components'

// Hooks
import { useEntries } from '@/hooks'
import { Portfolio } from '@/interfaces'

const PortfolioPage: NextPage = () => {
  // Hooks
  const { loading, items, isFirstPage, hasPages, handlePrevPage, handleNextPage } = useEntries(
    '/portfolios'
  )

  // Render
  if (!items) {
    return null
  }

  return (
    <>
      <SEO
        title="Portfolio"
        description="Portafolio de Daniel Esteves para mostrar sus proyectos realizados en todo su trayecto como desarrollador web frontend. React, NextJS, Gatsby y WordPress."
      />

      <div className="w-full py-16">
        <div className="container px-5">
          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[...Array(9).keys()].map((key) => (
                <div
                  key={key}
                  className="relative w-full max-w-sm mx-auto overflow-hidden bg-black border rounded-md shadow bg-opacity-40"
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
          )}

          {!loading && items && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {(items as Portfolio[]).map((portfolio) => (
                <Link
                  key={portfolio.id}
                  href={`/portafolio/${portfolio.slug}`}
                  className="relative block w-full overflow-hidden rounded-md shadow"
                >
                  <div className="flex flex-col">
                    <div>
                      <Media media={portfolio.ogCover} width={320} height={192} />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-center px-5 -m-1 space-y-2 transition duration-150 bg-opacity-60 group bg-secondary backdrop-blur hover:bg-opacity-50 hover:backdrop-blur-hover">
                      <h2 className="text-2xl font-bold text-center text-white transition duration-300 transform scale-90 group-hover:scale-110">
                        {portfolio.title}
                      </h2>

                      <div className="space-y-2 transition-all duration-300 transform scale-90 group-hover:space-y-0 group-hover:scale-110 group-hover:mt-4">
                        <h3 className="text-center text-white transition-all duration-300 group-hover:text-sm">
                          <AiFillTags className="inline-block mr-1" />
                          Categoría: {portfolio.category.name}
                        </h3>

                        <h3 className="text-center text-white transition-all duration-300 group-hover:text-sm">
                          <BiCodeAlt className="inline-block mr-1" />
                          <b>Tecnologías:</b> {portfolio.technologies.map((t) => t.name).join(`, `)}
                        </h3>
                        <div className="w-5/6 h-4 rounded bg-light-blue-400" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Pagination
            isFirstPage={isFirstPage}
            hasPages={hasPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </div>
      </div>
    </>
  )
}

export default PortfolioPage
