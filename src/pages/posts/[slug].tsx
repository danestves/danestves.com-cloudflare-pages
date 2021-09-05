// Dependencies
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkCodeTitles from 'remark-code-titles'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

// Internals
import { GraphImage, Views } from '@/components'
import MDXComponents from '@/components/MDX/Components'
import { sdk } from '@/lib'
import { formatDate } from '@/utils'
import type { PostQuery } from '@/generated/graphql'
import AssetMe from 'public/static/me.png'

export type PostPageProps = {
  post: PostQuery['post'] & {
    mdx: MDXRemoteSerializeResult<Record<string, unknown>>
  }
}

export const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const router = useRouter()

  return (
    <section className="w-full py-32">
      <h2 className="text-[26px] text-[#071D49] font-black text-center uppercase">
        Blog{' '}
        <span aria-label="victory hand" role="img">
          ✌️
        </span>
      </h2>

      <div className="container mt-5 max-w-[977px] mx-auto">
        <div className="grid items-center grid-cols-12 mb-6 gap-y-5 lg:gap-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="overflow-hidden rounded-[18px]">
              <GraphImage
                alt={post.title}
                image={{
                  ...post.cover,
                  height: 360,
                  width: 640,
                }}
                priority
              />
            </div>
            <div className="flex items-end px-6 -mt-8 space-x-4">
              <div className="w-16 h-16 overflow-hidden rounded-full drop-shadow-lg">
                <Image alt="@danestves" placeholder="blur" src={AssetMe} />
              </div>

              <Views slug={post.slug} />
            </div>
          </div>
          <div className="col-span-12 space-y-4 lg:col-span-5">
            <h1 className="text-2xl font-bold text-[#071D49]">{post.title}</h1>
            <p className="text-xs font-bold text-primary">
              Publicado{' '}
              <time dateTime={post.published}>
                {formatDate({
                  date: new Date(post.published).toISOString().slice(0, 19),
                  formatter: 'MMM. d yyy',
                  locale: router.locale,
                })}
              </time>
            </p>
            <p className="text-xs font-bold text-[#838383] whitespace-pre-line">
              {post.seo.description}
            </p>
          </div>
        </div>
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
