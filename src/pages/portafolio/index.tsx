// Dependencies
import Image from '@graphcms/react-image'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'
import type { I18nProps } from 'next-rosetta'
import type { NextPage, GetStaticProps } from 'next'

// Internals
import { SEO, Link } from '@/components'
import { sdk } from '@/lib/graphcms'
import type { Portfolio } from '@/generated/graphql'
import type { Asset } from '@/interfaces'
import type { MyLocale } from 'i18n'

interface Props {
  portfolios: Portfolio[]
}

const PortfolioPage: NextPage<Props> = ({ portfolios }) => {
  const { locale } = useRouter()
  const { t } = useI18n<MyLocale>()

  return (
    <>
      <SEO
        description={t('portfolio.seo.description')}
        title={t('portfolio.seo.title')}
      />

      <section className="container">
        <div className="lg:w-3/4 xl:w-2/3 mx-auto my-20 text-center">
          <h1 className="dark:text-white sm:text-5xl md:text-6xl mb-10 text-4xl font-bold text-gray-900">
            {t('portfolio.title')}
          </h1>
        </div>
      </section>

      <div className="container px-5 mb-24 space-y-16">
        {portfolios.map((portfolio) => (
          <div key={portfolio.slug}>
            <Link
              className="group hover:bg-gray-50 dark:hover:bg-secondary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary hover:shadow focus:outline-none md:grid-cols-2 grid items-center grid-cols-1 gap-6 pb-1 overflow-hidden transition-all duration-150 rounded-lg"
              href={`/portafolio/${portfolio.slug}-${portfolio.id}`}
              locale={locale}
            >
              <div className="group-hover:shadow-lg flex w-full overflow-hidden duration-200 transform rounded-lg">
                <Image
                  alt={portfolio.title}
                  image={portfolio.cover as Asset}
                  outerWrapperClassName="w-full"
                  withWebp
                />
              </div>
              <div>
                <h2 className="dark:text-white group-hover:underline mb-4 text-4xl leading-tight text-gray-700">
                  {portfolio.title}
                </h2>
                <p className="dark:text-white text-gray-500">
                  {portfolio.seo?.description}
                </p>
                <div className="flex mt-4">
                  <button
                    className="flex justify-center items-center py-3 min-w-[160px] font-semibold text-primary-700 dark:text-secondary-100 bg-primary-100 dark:bg-secondary-900 rounded border border-primary-700 dark:border-secondary-100 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary transition-all duration-150 transform group-hover:-translate-y-1 focus:outline-none"
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

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const portfolios = await sdk()
    .getAllPortfoliosForPortfolioPage({
      locale: locale as any,
    })
    .then(({ data }) => data.portfolios)

  return {
    props: {
      table,
      portfolios,
    },
  }
}

export default PortfolioPage
