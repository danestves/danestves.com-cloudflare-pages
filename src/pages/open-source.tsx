// Dependencies
import * as React from 'react'
import { NextPage, GetStaticProps } from 'next'
import { motion } from 'framer-motion'

// Components
import { SEO } from '@/components'

// Interfaces
import { Repository } from '@/interfaces'

// Lib
import { getRepositories } from '@/lib/github'

interface Props {
  repositories: Repository[]
}

const OpenSource: NextPage<Props> = ({ repositories }) => {
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
        title="Open Source"
        description="Proyectos libres para aportar nuevas herramientas a la comunidad. "
      />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Open Source
          </h1>
        </div>
      </section>

      <section className="container px-5">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={list}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {repositories.map((repository) => (
            <motion.a
              key={repository.id}
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
            >
              <img
                src={`https://github-readme-stats.danestves.com/api/pin/?username=${
                  repository.owner.login
                }&repo=${
                  repository.name
                }&title_color=fff&icon_color=00C389&text_color=9f9f9f&bg_color=0c1014${
                  repository.owner.login === 'opengraphimg' ? '&show_owner=true' : ''
                }`}
                alt={repository.full_name}
                width={400}
                height={120}
                loading="lazy"
                className="w-full"
              />
            </motion.a>
          ))}
        </motion.div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const repositories = await getRepositories()

  return {
    props: {
      repositories: repositories || [],
    },
    revalidate: 1200,
  }
}

export default OpenSource
