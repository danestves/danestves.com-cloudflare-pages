// Dependencies
import { NextPage, GetStaticProps } from 'next'
import Image from 'next/image'
import { useI18n, I18nProps } from 'next-rosetta'
import { useRouter } from 'next/dist/client/router'

// Components
import { SEO, Link } from '@/components'

// Interfaces
import { FrontMatterPortfolio } from '@/interfaces'

// Libraries
import { getAllFilesFrontMatter } from '@/lib/mdx'

// Locales
import { MyLocale } from 'i18n'

interface Props {
  portfolios: FrontMatterPortfolio[]
}

const PortfolioPage: NextPage<Props> = ({ portfolios }) => {
  const { locale } = useRouter()
  const { t } = useI18n<MyLocale>()

  return (
    <>
      <SEO title={t('portfolio.seo.title')} description={t('portfolio.seo.description')} />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {t('portfolio.title')}
          </h1>
        </div>
      </section>

      <div className="container px-5 space-y-16">
        {portfolios.map((portfolio) => (
          <div key={portfolio.slug}>
            <Link
              href={`/portafolio/${portfolio.slug}`}
              locale={locale}
              className="grid items-center grid-cols-1 gap-6 overflow-hidden rounded-lg md:grid-cols-2 group focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none"
            >
              <div className="flex w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg">
                <Image src={portfolio.image} width={736} height={414} alt={portfolio.title} />
              </div>
              <div>
                <h2 className="mb-4 text-4xl leading-tight text-white group-hover:underline">
                  {portfolio.title}
                </h2>
                <p className="text-white">{portfolio.summary}</p>
                <div className="flex mt-4">
                  <button
                    type="button"
                    className="flex items-center px-6 py-2 font-semibold transition-all duration-150 transform rounded group-hover:-translate-y-1 focus:outline-none bg-primary text-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
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
  const portfolios = await getAllFilesFrontMatter('portfolio', locale as string)

  return {
    props: {
      table,
      portfolios: portfolios.sort((a: FrontMatterPortfolio, b: FrontMatterPortfolio) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }),
    },
  }
}

export default PortfolioPage
