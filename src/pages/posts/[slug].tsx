// Dependencies
import { window } from 'browser-monads-ts'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useI18n } from 'next-rosetta'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkCodeTitles from 'remark-code-titles'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

// Internals
import { GraphImage, Views } from '@/components'
import { ShareIcon } from '@/components/Icons'
import MDXComponents from '@/components/MDX/Components'
import useShare from '@/hooks/useShare'
import { sdk } from '@/lib/graphcms'
import { formatDate } from '@/utils'
import type { PostQuery } from '@/generated/graphql'
import type { Locale } from 'i18n'
import AssetMe from 'public/static/me.png'
import supabase from '@/lib/supabase'

export type PostPageProps = {
  post: PostQuery['post'] & {
    mdx: MDXRemoteSerializeResult<Record<string, unknown>>
  }
  views: number
}

export const PostPage: NextPage<PostPageProps> = ({ post, views }) => {
  const router = useRouter()
  const { t } = useI18n<Locale>()
  const { canShare, hasShared, share } = useShare({
    title: post.title,
    text: post.seo.description,
    url: `https://danestves.com${router.locale !== 'en' ? '/es' : ''}/posts/${
      post.slug
    }`,
  })

  const lang = router.locale === 'es' ? '/es' : ''

  return (
    <>
      <NextSeo
        additionalMetaTags={[
          {
            property: 'date',
            content: formatDate({
              date: new Date(post.published).toISOString().slice(0, 19),
              formatter: 'MMM. d yyy',
              locale: router.locale,
            }),
          },
          {
            property: 'flyyer:content',
            content: post.seo?.description,
          },
          {
            property: 'flyyer:date',
            content: new Date(post.published).toISOString(),
          },
          {
            property: 'flyyer:image',
            content: post.cover?.url,
          },
          {
            property: 'flyyer:locale',
            content: router.locale,
          },
          {
            property: 'flyyer:title',
            content: post.seo?.title,
          },
          {
            property: 'flyyer:views',
            content: views,
          },
          {
            property: 'article:modified_time',
            content: post.updatedAt,
          },
          {
            property: 'article:published_time',
            content: new Date(post.published).toISOString(),
          },
          {
            property: 'article:tag',
            content: post.tags?.map((tag) => tag.name).join(', '),
          },
          {
            property: 'profile:first_name',
            content: 'Daniel',
          },
          {
            property: 'profile:last_name',
            content: 'Esteves',
          },
        ]}
        description={post.seo.description}
        openGraph={{
          description: post.seo.description,
          images: [
            {
              alt: post.seo.title,
              height: 630,
              url: `https://cdn.flyyer.io/v2/danestves-preview/_/_${lang}${router.asPath}`,
              width: 1200,
            },
          ],
          title: post.seo.title,
          type: 'article',
        }}
        title={post.seo.title}
      />

      <ArticleJsonLd
        authorName={['Daniel Esteves']}
        dateModified={post.updatedAt}
        datePublished={new Date(post.published).toISOString().slice(0, 19)}
        description={post.seo?.description.replace(/\n/g, ' ') as string}
        images={[
          `https://cdn.flyyer.io/v2/danestves-preview/_/_${lang}${router.asPath}`,
        ]}
        publisherLogo="https://danestves.com/static/logo.png"
        publisherName="Daniel Esteves"
        title={post.seo?.title as string}
        url={window.location.href}
      />

      <section className="w-full py-32">
        <h2 className="text-[26px] text-secondary-darker font-black text-center uppercase dark:text-secondary">
          Blog{' '}
          <span aria-label="victory hand" role="img">
            ✌️
          </span>
        </h2>

        <div className="container mt-5 max-w-[977px] mx-auto">
          <div className="grid items-center grid-cols-12 mb-6 gap-y-5 md:gap-10">
            <div className="col-span-12 md:col-span-7">
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
              <div className="relative flex items-end px-6 -mt-10 space-x-4">
                <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-lg">
                  <Image alt="@danestves" placeholder="blur" src={AssetMe} />
                </div>

                <Views slug={post.slug} />

                <div className="absolute flex justify-end flex-1 right-6 bottom-6">
                  <button
                    className="z-10 flex items-center px-3 py-2 text-xs font-bold text-black rounded-full bg-primary"
                    onClick={share}
                    type="button"
                  >
                    <span className="sr-only sm:not-sr-only">
                      {hasShared
                        ? !canShare
                          ? t('pages.posts.slug.sharer.copied')
                          : t('pages.posts.slug.sharer.shared')
                        : t('pages.posts.slug.sharer.share')}
                    </span>
                    <ShareIcon
                      aria-hidden="true"
                      className="w-4 h-4 sm:ml-2 sm:-mr-1"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-12 space-y-4 md:col-span-5">
              <h1 className="text-2xl font-bold text-secondary-darker dark:text-secondary">
                {post.title}
              </h1>
              <p className="text-xs font-bold text-primary">
                {t('pages.posts.slug.published')}{' '}
                <time
                  dateTime={new Date(post.published).toISOString().slice(0, 19)}
                >
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
          <div className="max-w-full prose prose-lg dark:prose-dark">
            <MDXRemote
              compiledSource={post.mdx.compiledSource}
              components={MDXComponents}
            />
          </div>
        </div>
      </section>
    </>
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
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
      ],
      remarkPlugins: [remarkCodeTitles],
    },
  })

  const slug = `/api/views/${post.slug}`
  const views = await supabase
    .from('views')
    .select('value')
    .eq('id', post.slug)
    .limit(1)
    .then(({ data }) => data[0].value)

  return {
    props: {
      fallback: {
        [slug]: views,
      },
      post: {
        ...post,
        mdx,
      },
      table,
      views,
    },
    revalidate: 60 * 60,
  }
}

export default PostPage
