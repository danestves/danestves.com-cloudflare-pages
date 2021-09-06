// Dependencies
import { useRouter } from 'next/router'
import type { GetStaticProps, NextPage } from 'next'
import type { I18nProps } from 'next-rosetta'

// Internals
import { ContentCard, Link } from '@/components'
import { sdk } from '@/lib/graphcms'
import type { PortfoliosQuery } from '@/generated/graphql'
import type { Locale } from 'i18n'

export type PortfolioPageProps = {
  portfolios: PortfoliosQuery['portfolios']
}

export const PortfolioPage: NextPage<PortfolioPageProps> = ({ portfolios }) => {
  const router = useRouter()

  return (
    <section className="w-full py-32">
      <h1 className="text-[26px] text-[#071D49] font-black text-center uppercase">
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
              image={portfolio.cover}
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
  )
}

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const portfolios = await sdk().portfolios({
    first: 50,
    locale: locale as any,
  })

  return {
    props: { table, portfolios: portfolios.data.portfolios },
    revalidate: 60 * 60, // 1 hour
  }
}

export default PortfolioPage
