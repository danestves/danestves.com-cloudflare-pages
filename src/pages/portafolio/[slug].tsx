// Dependencies
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { I18nProps } from 'next-rosetta'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
import he from 'he'
import mdxPrism from 'mdx-prism'
import remarkCodeTitles from 'remark-code-titles'
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// @types
import { Locale, Portfolio as IPortfolio } from '@/generated/graphql'

// Components
import MDXComponents from '@/components/MDXComponents'

// Layouts
import PortfolioLayout from '@/layouts/portfolio'

// Libraries
import { getAllPortfoliosWithSlug, getPortfolio } from '@/lib/graphcms'

// Locales
import type { MyLocale } from 'i18n'

interface Props {
  portfolio: IPortfolio & {
    mdx: MdxRemote.Source
  }
}

const Portfolio: NextPage<Props> = ({ portfolio }) => <PortfolioLayout portfolio={portfolio} />

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<string | { params: any; locale?: string }> = []

  // Loop over every locale and later loop on every portfolio to add the locale
  for (const locale of locales as string[]) {
    const data = await getAllPortfoliosWithSlug(locale as Locale)

    data.portfolios.map((portfolio) => {
      paths.push({ params: { slug: `${portfolio.slug}-${portfolio.id}` }, locale })
    })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (context) => {
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
        mdx: await renderToString(he.decode(data.portfolio?.body || ''), {
          components: MDXComponents,
          mdxOptions: {
            remarkPlugins: [remarkCodeTitles, remarkA11yEmoji],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }], mdxPrism],
          },
        }),
      },
    },
  }
}

export default Portfolio