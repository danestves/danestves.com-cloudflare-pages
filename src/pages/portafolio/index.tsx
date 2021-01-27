// Dependencies
import * as React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Image from 'graphcms-image'
import removeMarkdown from 'markdown-to-text'
import { motion } from 'framer-motion'

// Components
import { SEO, Link, Pagination } from '@/components'

// Generated
import { PortfoliosQuery } from '@/generated/graphql'

// Lib
import { getPortfolios } from '@/lib/graphcms'

const PortfolioPage: NextPage<PortfoliosQuery> = ({ portfolios, count }) => {
  const list = {
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <SEO
        title="Portafolio"
        description="Portafolio de Daniel Esteves para mostrar sus proyectos realizados en todo su trayecto como desarrollador web frontend. React, NextJS, Gatsby y WordPress."
      />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Portafolio
          </h1>
        </div>
      </section>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={list}
        className="container px-5 space-y-16"
      >
        {portfolios.edges.map(({ node: portfolio }) => (
          <motion.div key={portfolio.id} variants={item}>
            <Link
              href={`/portafolio/${portfolio.slug}`}
              className="grid items-center grid-cols-1 gap-6 overflow-hidden rounded-lg md:grid-cols-2 group focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none"
            >
              <div className="w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg">
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
                <h2 className="mb-4 text-4xl leading-tight text-white group-hover:underline">
                  {portfolio.title}
                </h2>
                <p className="text-white">{removeMarkdown(portfolio.content.slice(0, 250))}...</p>
                <div className="flex mt-4">
                  <button
                    type="button"
                    className="flex items-center px-6 py-2 font-semibold transition-all duration-150 transform rounded group-hover:-translate-y-1 focus:outline-none bg-primary text-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
                  >
                    Ver Portafolio
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        <Pagination count={count.aggregate.count} limit={4} pageInfo={portfolios.pageInfo} />
      </motion.div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { first = '4', skip = '0' },
}) => {
  const data = await getPortfolios(Number(first), Number(skip))

  return {
    props: data,
  }
}

export default PortfolioPage
