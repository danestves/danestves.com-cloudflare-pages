// Dependencies
import { NextPage, GetStaticProps } from 'next'
import useSWR from 'swr'
import { useI18n, I18nProps } from 'next-rosetta'

// Components
import { GeneralObserver, SEO } from '@/components'

// Interfaces
import { Repository } from '@/interfaces'

// Libraries
import fetcher, { server } from '@/lib/fetcher'

// Locales
import type { MyLocale } from 'i18n'

interface Props {
  github: Response
}

const OpenSource: NextPage<Props> = ({ github }) => {
  const { data } = useSWR('/api/github', fetcher, { initialData: github })
  const { t } = useI18n<MyLocale>()

  const repositories = (data as any)?.repositories as Repository[]

  return (
    <>
      <SEO description={t('openSource.seo.description')} title={t('openSource.seo.title')} />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Open Source
          </h1>
        </div>
      </section>

      <section className="container px-5 mt-16 mb-24">
        <h2 className="mb-10 text-3xl font-bold text-gray-700 dark:text-white">
          {t('openSource.repositories.title')}
        </h2>

        <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {repositories?.map((repository) => (
            <GeneralObserver key={repository.id}>
              <div className="relative">
                <object
                  className="w-full"
                  data={`https://github-readme-stats.danestves.com/api/pin/?username=${
                    repository.owner.login
                  }&repo=${
                    repository.name
                  }&title_color=fff&icon_color=00C389&text_color=9f9f9f&bg_color=0c1014${
                    repository.owner.login === 'opengraphimg' ? '&show_owner=true' : ''
                  }`}
                ></object>

                {/* Fix object cannot be inside anchor tag (link not working) */}
                <a
                  className="absolute inset-0"
                  href={repository.html_url}
                  rel="noopener noreferrer"
                  target="_blank"
                ></a>
              </div>
            </GeneralObserver>
          ))}
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (context) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const data = await fetcher(`${server}/api/github`)

  return {
    props: {
      repositories: data,
      table,
    },
    // View every 24 hours if there is a new repository
    revalidate: 86400,
  }
}

export default OpenSource
