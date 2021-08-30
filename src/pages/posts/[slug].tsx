// Dependencies
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkCodeTitles from 'remark-code-titles'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

// Internals
import MDXComponents from '@/components/MDX/Components'
import { sdk } from '@/lib'
import type { PostQuery } from '@/generated/graphql'

export type PostPageProps = {
  post: PostQuery['post'] & {
    mdx: MDXRemoteSerializeResult<Record<string, unknown>>
  }
}

export const PostPage: NextPage<PostPageProps> = ({ post }) => {
  return (
    <section className="w-full py-32">
      <h1 className="text-[26px] text-[#071D49] font-black text-center uppercase">
        Blog{' '}
        <span aria-label="victory hand" role="img">
          ✌️
        </span>
      </h1>

      <div className="container mt-5 max-w-[977px] mx-auto">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2"></div>
        <div className="max-w-full prose prose-lg">
          <MDXRemote
            compiledSource={post.mdx.compiledSource}
            components={MDXComponents}
          />
        </div>
      </div>
    </section>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<string | { params: any; locale?: string }> = []

  // Loop over every locale and later loop on every blog to add the locale
  for (const locale of locales as string[]) {
    const data = await sdk()
      .postsWithSlug({
        first: 50,
      })
      .then((data) => data.data)

    data.posts.map((post) => {
      paths.push({ params: { slug: post.slug }, locale })
    })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const { data } = await sdk().post({
    locale: locale as any,
    slug: context.params.slug as string,
    stage: 'PUBLISHED' as any,
  })

  if (!data.post) {
    return {
      notFound: true,
    }
  }

  const post = data.post
  const mdx = await serialize(post.body, {
    mdxOptions: {
      remarkPlugins: [remarkCodeTitles],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
      ],
    },
  })

  return {
    props: {
      table,
      post: {
        ...post,
        mdx,
      },
    },
    revalidate: 60 * 60,
  }
}

export default PostPage
