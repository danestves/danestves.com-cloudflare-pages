// Dependencies
import Image from '@graphcms/react-image'
import { MDXRemote } from 'next-mdx-remote'
import { useI18n } from 'next-rosetta'

// Internals
import { SEO } from '@/components'
import MDXComponents from '@/components/MDXComponents'
import type { Portfolio } from '@/generated/graphql'
import type { Asset } from '@/interfaces'
import type { MyLocale } from 'i18n'

interface Props {
  portfolio: Portfolio & {
    mdx: {
      compiledSource: string
    }
  }
}

export default function PortfolioLayout({ portfolio }: Props): JSX.Element {
  const { t } = useI18n<MyLocale>()

  return (
    <>
      <SEO
        date={portfolio.publishedAt}
        description={portfolio.seo?.description}
        title={portfolio.seo?.title}
      />

      <div className="container px-5 py-16 space-y-16">
        <h1 className="mb-10 text-4xl text-center dark:text-white sm:text-5xl md:text-6xl">
          {portfolio.title}
        </h1>

        <Image
          alt={portfolio.seo?.title}
          image={portfolio.cover as Asset}
          maxWidth={984}
          outerWrapperClassName="rounded-lg overflow-hidden mx-auto max-w-screen-lg"
          withWebp
        />

        <div className="grid max-w-screen-md grid-cols-1 p-5 mx-auto bg-gray-300 rounded-xl dark:bg-secondary-900 md:grid-cols-3">
          <div>
            <h2 className="mb-2 font-semibold text-center underline dark:text-white">
              {t('portfolio.portfolios.industry')}
            </h2>
            <p className="text-sm text-center dark:text-white">
              {portfolio.industry}
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-center underline dark:text-white">
              {t('portfolio.portfolios.technology')}
            </h2>
            <p className="text-sm text-center dark:text-white">
              {portfolio.technologies.join(', ')}
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-center underline dark:text-white">
              {t('portfolio.portfolios.web')}
            </h2>
            <div className="flex justify-center">
              <a
                className="flex items-center space-x-1 text-sm font-semibold underline focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none dark:text-primary"
                href={portfolio.project_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Ver</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  height="1em"
                  stroke="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
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
          <div className="max-w-full prose prose-lg dark:prose-dark">
            <MDXRemote
              compiledSource={portfolio.mdx.compiledSource}
              components={MDXComponents}
            />
          </div>
        </div>
      </div>
    </>
  )
}
