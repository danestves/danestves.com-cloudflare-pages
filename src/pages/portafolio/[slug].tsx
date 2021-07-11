// Dependencies
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import he from 'he'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkCodeTitles from 'remark-code-titles'
import type { I18nProps } from 'next-rosetta'
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'

// Internals
import PortfolioLayout from '@/layouts/portfolio'
import { getAllPortfoliosWithSlug, getPortfolio } from '@/lib/graphcms'
import type { Locale, Portfolio as IPortfolio } from '@/generated/graphql'
import type { MyLocale } from 'i18n'

interface Props {
  portfolio: IPortfolio & {
    mdx: {
      compiledSource: string
    }
  }
}

const Portfolio: NextPage<Props> = ({ portfolio }) => (
  <PortfolioLayout portfolio={portfolio} />
)

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<string | { params: any; locale?: string }> = []

  // Loop over every locale and later loop on every portfolio to add the locale
  for (const locale of locales as string[]) {
    const data = await getAllPortfoliosWithSlug(locale as Locale)

    data.portfolios.map((portfolio) => {
      paths.push({
        params: { slug: `${portfolio.slug}-${portfolio.id}` },
        locale,
      })
    })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const baseSlug = (context.params?.slug as string).split('-')
  const id = baseSlug[baseSlug.length - 1]
  const data = await getPortfolio(context.locale as any, id)

  return {
    props: {
      table,
      portfolio: {
        ...data.portfolio,
        mdx: await serialize(he.decode(data.portfolio?.body || ''), {
          mdxOptions: {
            remarkPlugins: [remarkCodeTitles, remarkA11yEmoji],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'append' }],
            ],
          },
        }),
      },
    },
    revalidate: 600,
  }
}

export default Portfolio
