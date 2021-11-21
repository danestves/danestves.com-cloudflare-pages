// Dependencies
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'
import type { GetStaticProps, NextPage } from 'next'
import type { I18nProps } from 'next-rosetta'

// Internals
import { ContentCard, Link, Seo } from '@/components'
import { Locale as GraphLocale } from '@/generated/graphql'
import { sdk } from '@/lib/graphcms'
import type { PortfoliosQuery } from '@/generated/graphql'
import type { Locale } from 'i18n'

export type PortfolioPageProps = {
  portfolios: PortfoliosQuery['portfolios']
}

export const PortfolioPage: NextPage<PortfolioPageProps> = ({ portfolios }) => {
  const router = useRouter()
  const { t } = useI18n<Locale>()

  return (
    <>
      <Seo
        description={t('pages.portfolio.seo.description')}
        title={t('pages.portfolio.seo.title')}
      />

      <section className="w-full py-32">
        <h1 className="text-[26px] text-secondary-darker font-black text-center uppercase dark:text-secondary">
          Portafolio{' '}
          <span aria-label="victory hand" role="img">
            ✌️
          </span>
        </h1>

        <div className="container mt-5 max-w-[977px] mx-auto">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {portfolios.map((portfolio, index) => (
              <ContentCard
                as={Link}
                description={portfolio.seo.description}
                href={portfolio.project_url}
                image={portfolio.cover.handle}
                key={portfolio.id}
                locale={router.locale}
                priorityImage={index <= 2}
                rel="noopener noreferrer"
                target="_blank"
                title={portfolio.title}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const portfolios = await sdk().portfolios({
    first: 50,
    locale: locale as GraphLocale,
  })

  return {
    props: { table, portfolios: portfolios.data.portfolios },
    revalidate: 60 * 60, // 1 hour
  }
}

export default PortfolioPage
