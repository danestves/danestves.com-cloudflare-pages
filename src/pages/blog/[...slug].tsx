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
import { Post } from '@/interfaces'

// Layouts
import BlogLayout from '@/layouts/blog'

// Locales
import type { MyLocale } from 'i18n'

interface Props {
  post: Post
}

export default function Blog({ post }: Props): JSX.Element | null {
  const content = useHydrate(post, {
    components: MDXComponents,
  })

  return (
    <BlogLayout frontMatter={post.frontMatter} slug={post.slug}>
      {content}
    </BlogLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = await getMdxPaths('blog/es')

  // Loop over every locale and later loop on every blog to add the locale
  const paths =
    locales
      ?.map((locale) => {
        return posts.map((p) => ({
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

  const post = await getMdxNode(`blog/${locale}`, context as any, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [remarkCodeTitles, remarkA11yEmoji],
      rehypePlugins: [[rehypeAutolinkHeadings, { behavior: 'append' }], rehypeSlug, mdxPrism],
    },
  })

  return {
    props: {
      table,
      post: {
        ...post,
        frontMatter: {
          ...post.frontMatter,
          // Remove HTML tags and count the words
          wordCount: post.mdx.renderedOutput.replace(/<(.|\n)*?>/g, '').split(/\s+/gu).length,
        },
      },
    },
  }
}
