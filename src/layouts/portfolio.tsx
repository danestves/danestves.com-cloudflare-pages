// Dependencies
import Image from '@graphcms/react-image'
import { useI18n } from 'next-rosetta'
import { MdxRemote } from 'next-mdx-remote/types'
import hydrate from 'next-mdx-remote/hydrate'

// @types
import { Portfolio } from '@/generated/graphql'

// Components
import { SEO } from '@/components'
import MDXComponents from '@/components/MDXComponents'

// Interfaces
import { Asset } from '@/interfaces'

// Locales
import type { MyLocale } from 'i18n'

interface Props {
  portfolio: Portfolio & {
    mdx: MdxRemote.Source
  }
}

export default function PortfolioLayout({ portfolio }: Props): JSX.Element {
  const { t } = useI18n<MyLocale>()

  return (
    <>
      <SEO
        title={portfolio.seo?.title}
        description={portfolio.seo?.description}
        shareImage={`https://danestves.com/og.jpg`}
        date={portfolio.publishedAt}
      />

      <div className="container px-5 py-16 space-y-16">
        <h1 className="mb-10 text-4xl text-center text-white sm:text-5xl md:text-6xl">
          {portfolio.title}
        </h1>

        <Image
          image={portfolio.cover as Asset}
          alt={portfolio.seo?.title}
          maxWidth={984}
          withWebp
          outerWrapperClassName="rounded-lg overflow-hidden mx-auto max-w-screen-lg"
        />

        <div className="grid max-w-screen-md grid-cols-1 p-5 mx-auto bg-secondary-900 md:grid-cols-3 rounded-xl">
          <div>
            <h2 className="mb-2 font-semibold text-center text-white underline">
              {t('portfolio.portfolios.industry')}
            </h2>
            <p className="text-sm text-center text-white">{portfolio.industry}</p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-center text-white underline">
              {t('portfolio.portfolios.technology')}
            </h2>
            <p className="text-sm text-center text-white">{portfolio.technologies.join(', ')}</p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-center text-white underline">
              {t('portfolio.portfolios.web')}
            </h2>
            <div className="flex justify-center">
              <a
                href={portfolio.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm underline focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none text-primary"
              >
                <span>Ver</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 3L16.293 6.293 9.293 13.293 10.707 14.707 17.707 7.707 21 11 21 3z" />
                  <path d="M19,19H5V5h7l-2-2H5C3.897,3,3,3.897,3,5v14c0,1.103,0.897,2,2,2h14c1.103,0,2-0.897,2-2v-5l-2-2V19z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-screen-md mx-auto">
          <div className="max-w-full prose prose-lg">
            {hydrate(portfolio.mdx, {
              components: MDXComponents,
            })}
          </div>
        </div>
      </div>
    </>
  )
}
