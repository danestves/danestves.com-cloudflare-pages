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
import BlogLayout from '@/layouts/blog'
import { getAllPostsWithSlug, getPost } from '@/lib/graphcms'
import type { Locale, Post } from '@/generated/graphql'
import type { MyLocale } from 'i18n'

interface Props {
  post: Post & {
    mdx: {
      compiledSource: string
    }
  }
}

const PostPage: NextPage<Props> = ({ post }) => <BlogLayout post={post} />

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<string | { params: any; locale?: string }> = []

  // Loop over every locale and later loop on every blog to add the locale
  for (const locale of locales as string[]) {
    const data = await getAllPostsWithSlug(locale as Locale)

    data.posts.map((post) => {
      paths.push({ params: { slug: `${post.slug}-${post.id}` }, locale })
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

  const data = await getPost(context.locale as any, id)

  return {
    props: {
      table,
      post: {
        ...data.post,
        mdx: await serialize(he.decode(data.post?.body || ''), {
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

export default PostPage
