// Dependencies
import hydrate from 'next-mdx-remote/hydrate'
import { GetStaticPaths, GetStaticProps } from 'next'
import { I18nProps } from 'next-rosetta'

// Components
import MDXComponents from '@/components/MDXComponents'

// Interfaces
import { FrontMatterPortfolio } from '@/interfaces'

// Layouts
import PortfolioLayout from '@/layouts/portfolio'

// Libraries
import { getFiles, getFileBySlug } from '@/lib/mdx'

// Locales
import { MyLocale } from 'i18n'

interface Props {
  post: {
    mdxSource: {
      compiledSource: string
      renderedOutput: string
      scope?: Record<string, unknown>
    }
    frontMatter: FrontMatterPortfolio
  }
}

export default function Portfolio({ post: { mdxSource, frontMatter } }: Props): JSX.Element {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return <PortfolioLayout frontMatter={frontMatter}>{content}</PortfolioLayout>
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = await getFiles('portfolio', 'en')

  const paths = locales?.map((locale) => {
    return posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
      locale,
    }))
  }) as any

  return {
    paths: [...paths[0], ...paths[1]],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (context) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)

  const post = await getFileBySlug('portfolio', context.params?.slug as string, locale as string)

  return {
    props: {
      table,
      post,
    },
  }
}
