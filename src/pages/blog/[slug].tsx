// Dependencies
import hydrate from 'next-mdx-remote/hydrate'
import { GetStaticPaths, GetStaticProps } from 'next'

// Components
import MDXComponents from '@/components/MDXComponents'

// Interfaces
import { FrontMatterPost } from '@/interfaces'

// Layouts
import BlogLayout from '@/layouts/blog'

// Libraries
import { getFiles, getFileBySlug } from '@/lib/mdx'

interface Props {
  mdxSource: {
    compiledSource: string
    renderedOutput: string
    scope?: Record<string, unknown>
  }
  frontMatter: FrontMatterPost
}

export default function Blog({ mdxSource, frontMatter }: Props): JSX.Element {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles('blog')

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
  const post = await getFileBySlug('blog', params?.slug as string)

  return { props: post }
}
