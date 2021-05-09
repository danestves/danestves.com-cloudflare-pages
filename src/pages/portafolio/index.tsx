// Dependencies
import { NextPage, GetStaticProps } from 'next'
import Image from '@graphcms/react-image'
import { useI18n, I18nProps } from 'next-rosetta'
import { useRouter } from 'next/dist/client/router'

// @types
import { Portfolio } from '@/generated/graphql'
import { Asset } from '@/interfaces'

// Components
import { SEO, Link } from '@/components'

// Libraries
import { getAllPortfoliosForPortfolioPage } from '@/lib/graphcms'

// Locales
import type { MyLocale } from 'i18n'

interface Props {
  portfolios: Portfolio[]
}

const PortfolioPage: NextPage<Props> = ({ portfolios }) => {
  const { locale } = useRouter()
  const { t } = useI18n<MyLocale>()

  return (
    <>
      <SEO description={t('portfolio.seo.description')} title={t('portfolio.seo.title')} />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            {t('portfolio.title')}
          </h1>
        </div>
      </section>

      <div className="container px-5 mb-24 space-y-16">
        {portfolios.map((portfolio) => (
          <div key={portfolio.slug}>
            <Link
              className="grid items-center grid-cols-1 gap-6 pb-1 overflow-hidden transition-all duration-150 rounded-lg group focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none hover:bg-gray-50 dark:hover:bg-secondary-700 hover:shadow md:grid-cols-2"
              href={`/portafolio/${portfolio.slug}-${portfolio.id}`}
              locale={locale}
            >
              <div className="flex w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg">
                <Image
                  alt={portfolio.title}
                  image={portfolio.cover as Asset}
                  outerWrapperClassName="w-full"
                  withWebp
                />
              </div>
              <div>
                <h2 className="mb-4 text-4xl leading-tight text-gray-700 dark:text-white group-hover:underline">
                  {portfolio.title}
                </h2>
                <p className="text-gray-500 dark:text-white">{portfolio.seo?.description}</p>
                <div className="flex mt-4">
                  <button
                    className="flex justify-center items-center py-3 font-semibold transition-all duration-150 transform rounded border border-primary-700 text-primary-700 bg-primary-100 min-w-[160px] group-hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary dark:bg-secondary-900 dark:text-secondary-100 dark:border-secondary-100"
                    type="button"
                  >
                    {t('portfolio.portfolios.button.label')}
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (context) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const portfolios = (await getAllPortfoliosForPortfolioPage(locale as any)).portfolios

  return {
    props: {
      table,
      portfolios,
    },
  }
}

export default PortfolioPage
