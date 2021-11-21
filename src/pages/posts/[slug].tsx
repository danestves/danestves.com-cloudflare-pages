// Dependencies
import { window } from 'browser-monads-ts'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { useI18n } from 'next-rosetta'
import { ArticleJsonLd, BlogJsonLd } from 'next-seo'
import { allEnglishPosts, allSpanishPosts } from '.contentlayer/data'
import type { EnglishPost, SpanishPost } from '.contentlayer/types'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

// Internals
import { Seo, Views } from '@/components'
import { InformationCircleIcon, ShareIcon } from '@/components/Icons'
import MDXComponents from '@/components/MDX/Components'
import useShare from '@/hooks/useShare'
import { getViewsBySlug } from '@/lib/supabase'
import { formatDate } from '@/utils'
import AssetMe from 'public/static/me.jpeg'
import type { Locale } from 'i18n'

export type PostPageProps = {
  post: EnglishPost | SpanishPost
  preview: boolean
  views: number
}

export const PostPage: NextPage<PostPageProps> = ({ post, preview, views }) => {
  const router = useRouter()
  const Component = useMDXComponent(post.body.code)
  const { t } = useI18n<Locale>()
  const { canShare, hasShared, share } = useShare({
    title: post.title,
    text: post.seo.description,
    url: `https://danestves.com${router.locale !== 'en' ? '/es' : ''}/posts/${
      post.slug
    }`,
  })

  const lang = router.locale === 'es' ? '/es' : ''

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Seo
        additionalMetaTags={[
          {
            property: 'flyyer:content',
            content: post.seo?.description,
          },
          {
            property: 'flyyer:date',
            content: new Date(post.publishedAt).toISOString(),
          },
          {
            property: 'flyyer:image',
            content: post.cover,
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
            content: `${views}`,
          },
        ]}
        description={post.seo.description}
        openGraph={{
          article: {
            authors: ['https://twitter.com/@danestves'],
            modifiedTime: post.publishedAt,
            publishedTime: new Date(post.publishedAt).toISOString(),
            tags: post.tags?.map((tag) => tag),
          },
          images: [
            {
              alt: post.seo.title,
              height: 630,
              url: `https://cdn.flyyer.io/v2/danestves/_/_${lang}${router.asPath}`,
              width: 1200,
            },
          ],
          profile: {
            firstName: 'Daniel',
            gender: 'male',
            lastName: 'Esteves',
            username: 'danestves',
          },
          type: 'article',
        }}
        title={post.seo.title}
      />

      <ArticleJsonLd
        authorName={['Daniel Esteves']}
        dateModified={post.publishedAt}
        datePublished={new Date(post.publishedAt).toISOString().slice(0, 19)}
        description={post.seo?.description.replace(/\n/g, ' ') as string}
        images={[
          `https://cdn.flyyer.io/v2/danestves/_/_${lang}${router.asPath}`,
        ]}
        publisherLogo="https://danestves.com/static/logo.png"
        publisherName="Daniel Esteves"
        title={post.seo?.title as string}
        url={window.location.href}
      />

      <BlogJsonLd
        authorName="Daniel Esteves"
        dateModified={post.publishedAt}
        datePublished={new Date(post.publishedAt).toISOString().slice(0, 19)}
        description={post.seo?.description.replace(/\n/g, ' ') as string}
        images={[
          `https://cdn.flyyer.io/v2/danestves/_/_${lang}${router.asPath}`,
        ]}
        title={post.seo?.title as string}
        url={window.location.href}
      />

      <section className="w-full py-32">
        {preview && (
          <div className="container max-w-[977px] mx-auto mb-5">
            <div className="p-4 rounded-md bg-blue-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <InformationCircleIcon
                    aria-hidden="true"
                    className="w-5 h-5 text-blue-400"
                  />
                </div>
                <div className="flex-1 ml-3 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">
                    This page is a preview.
                  </p>
                  <p className="mt-3 text-sm md:mt-0 md:ml-6">
                    {/* eslint-disable-next-line */}
                    <a
                      className="font-medium text-blue-700 whitespace-nowrap hover:text-blue-600"
                      href="/api/exit-preview"
                    >
                      Exit preview mode <span aria-hidden="true">&rarr;</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-[26px] text-secondary-darker font-black text-center uppercase dark:text-secondary">
          Blog{' '}
          <span aria-label="victory hand" role="img">
            ✌️
          </span>
        </h2>

        {!router.isFallback && (
          <div className="container mt-5 max-w-[977px] mx-auto">
            <div className="grid items-center grid-cols-12 mb-6 gap-y-5 md:gap-10">
              <div className="col-span-12 md:col-span-7">
                <div className="overflow-hidden flex rounded-[18px]">
                  <Image
                    alt={post.title}
                    height={360}
                    priority
                    src={post.cover}
                    width={640}
                  />
                </div>
                <div className="relative flex items-end px-6 -mt-10 space-x-4">
                  <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-lg">
                    <Image alt="@danestves" placeholder="blur" src={AssetMe} />
                  </div>

                  <Views slug={post.slug} views={views} />

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
                  <time dateTime={new Date(post.publishedAt).toISOString()}>
                    {formatDate({
                      date: new Date(post.publishedAt).toISOString(),
                      formatter: 'MMM. d yyy',
                      locale: router.locale,
                    })}
                  </time>
                </p>
                <p
                  className="text-xs font-bold text-[#838383] whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: post.seo.description }}
                ></p>
              </div>
            </div>
            <div className="max-w-full prose prose-lg dark:prose-dark">
              <Component components={MDXComponents} />
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<string | { params: any; locale?: string }> = []

  // Loop over every locale and later loop on every blog to add the locale
  for (const locale of locales as string[]) {
    allEnglishPosts.map((p) => paths.push({ params: { slug: p.slug }, locale }))
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ ...ctx }) => {
  const locale = ctx.locale || ctx.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  let post: EnglishPost | SpanishPost

  switch (locale) {
    case 'es':
      post = allSpanishPosts.find((p) => p.slug === ctx.params.slug)
      break
    default:
      post = allEnglishPosts.find((p) => p.slug === ctx.params.slug)
      break
  }

  const views = await getViewsBySlug(post.slug)

  return {
    props: {
      post,
      table,
      views,
    },
    revalidate: 12 * 60 * 60,
  }
}

export default PostPage
