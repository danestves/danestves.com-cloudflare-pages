// Dependencies
import { GetStaticPaths, GetStaticProps } from 'next'
import { I18nProps } from 'next-rosetta'
import { useHydrate } from 'next-mdx/client'
import { getMdxPaths, getMdxNode } from 'next-mdx/server'
import mdxPrism from 'mdx-prism'
import remarkCodeTitles from 'remark-code-titles'
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// Components
import MDXComponents from '@/components/MDXComponents'

// Interfaces
import { Portfolio as IPortfolio } from '@/interfaces'

// Layouts
import PortfolioLayout from '@/layouts/portfolio'

// Locales
import type { MyLocale } from 'i18n'

interface Props {
  portfolio: IPortfolio
}

export default function Portfolio({ portfolio }: Props): JSX.Element {
  const content = useHydrate(portfolio as any, {
    components: MDXComponents,
  })

  return <PortfolioLayout frontMatter={portfolio.frontMatter}>{content}</PortfolioLayout>
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const portfolios = await getMdxPaths('portfolio/es')

  // Loop over every locale and later loop on every portfolio to add the locale
  const paths =
    locales
      ?.map((locale) => {
        return portfolios.map((p) => ({
          ...p,
          locale,
        }))
      })
      // Combine the two arrays into one
      .reduce((prev, current) => [...prev, ...current]) || []

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (context) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)

  const portfolio = await getMdxNode(`portfolio/${locale}`, context as any, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [remarkCodeTitles, remarkA11yEmoji],
      rehypePlugins: [[rehypeAutolinkHeadings, { behavior: 'append' }], rehypeSlug, mdxPrism],
    },
  })

  return {
    props: {
      table,
      portfolio: {
        ...portfolio,
        frontMatter: {
          ...portfolio.frontMatter,
          // Remove HTML tags and count the words
          wordCount: portfolio.mdx.renderedOutput.replace(/<(.|\n)*?>/g, '').split(/\s+/gu).length,
        },
      },
    },
  }
}
