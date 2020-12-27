// Dependencies
import * as React from 'react'
import { NextPage, GetStaticProps } from 'next'
import { RiGitRepositoryLine, RiStarFill } from 'react-icons/ri'
import { AiOutlineFork } from 'react-icons/ai'

// Components
import { SEO } from '@/components'

// Interfaces
import { Repository } from '@/interfaces'

// Lib
import axios from '@/lib/axios'
import { getGitHubLanguageColor } from '@/utils'

interface Props {
  repositories: Repository[]
}

const OpenSource: NextPage<Props> = ({ repositories }) => {
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {repositories.map((repository) => (
            <article
              key={repository.id}
              className="flex flex-col justify-between p-4 bg-gray-900 border border-gray-500 rounded shadow"
            >
              <div>
                <div className="flex items-center mb-2 space-x-2">
                  <RiGitRepositoryLine className="w-5 h-5 text-white" />

                  <a
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-500 focus:outline-none"
                  >
                    {repository.name}
                  </a>
                </div>

                <a
                  href={repository.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm text-gray-500 focus:outline-none"
                >
                  {repository.description}
                </a>
              </div>

              <div className="flex flex-wrap mt-4 space-x-4">
                <p className="flex items-center space-x-1">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ background: getGitHubLanguageColor(repository.language) }}
                  />
                  <span className="text-sm text-gray-400">{repository.language}</span>
                </p>

                <a
                  href={`${repository.html_url}/stargazers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1"
                >
                  <RiStarFill className="inline-block w-4 h-4 text-white" />
                  <span className="text-sm text-gray-400">{repository.stargazers_count}</span>
                </a>

                <a
                  href={`${repository.html_url}/network/members`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1"
                >
                  <AiOutlineFork className="inline-block w-4 h-4 text-white" />
                  <span className="text-sm text-gray-400">{repository.forks_count}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const repositories: Repository[] = await axios
    .get('https://api.github.com/users/danestves/repos?per_page=50')
    .then(({ data: repositories }: { data: Repository[] }): Repository[] => {
      return repositories
        .sort((a, b) => {
          // eslint-disable-next-line
          // @ts-ignore
          return new Date(b.created_at) - new Date(a.created_at)
        })
        .filter((repository: Repository) => {
          switch (repository.id) {
            case 250953618:
              return repository
            case 252873798:
              return repository
            case 315161253:
              return repository
            case 321155009:
              return repository
            case 245557075:
              return repository
            case 324420971:
              return repository
            case 324068819:
              return repository
            case 323531066:
              return repository
            case 228873079:
              return repository
            default:
              return null
          }
        })
    })

  return {
    props: {
      repositories: repositories || [],
    },
    revalidate: 1200,
  }
}

export default OpenSource
