// Dependencies
import hydrate from 'next-mdx-remote/hydrate'
import { GetStaticPaths, GetStaticProps } from 'next'

// Components
import MDXComponents from '@/components/MDXComponents'

// Interfaces
import { FrontMatterPortfolio } from '@/interfaces'

// Layouts
import PortfolioLayout from '@/layouts/portfolio'

// Libraries
import { getFiles, getFileBySlug } from '@/lib/mdx'

interface Props {
  mdxSource: {
    compiledSource: string
    renderedOutput: string
    scope?: Record<string, unknown>
  }
  frontMatter: FrontMatterPortfolio
}

export default function Portfolio({ mdxSource, frontMatter }: Props): JSX.Element {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return <PortfolioLayout frontMatter={frontMatter}>{content}</PortfolioLayout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles('portfolio')

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getFileBySlug('portfolio', params?.slug as string)

  return { props: post }
}
