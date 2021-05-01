// Dependencies
import Image from 'next/image'
import GraphCmsImage from '@graphcms/react-image'
import { ArticleJsonLd } from 'next-seo'
import { window } from 'browser-monads'
import { useRouter } from 'next/dist/client/router'
import { useI18n } from 'next-rosetta'
import { FlayyerIO } from '@flayyer/flayyer'
import { MdxRemote } from 'next-mdx-remote/types'
import hydrate from 'next-mdx-remote/hydrate'

// @types
import { Post } from '@/generated/graphql'

// Components
import { SEO, ViewsCounter, Subscribe, Link } from '@/components'
import MDXComponents from '@/components/MDXComponents'

// Interfaces
import { Asset } from '@/interfaces'

// Locales
import type { MyLocale } from 'i18n'

// Utils
import { formatDate, readingTime } from '@/utils'

const editUrl = (slug: string, lang: string): string => {
  return `https://github.com/danestves/website/edit/master/src/data/posts/${lang}/${slug}.mdx`
}
const discussUrl = (slug: string): string => {
  return `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://danestves.com/blog/${slug}`
  )}`
}

interface Props {
  post: Post & {
    mdx: MdxRemote.Source
  }
}

export default function PostLayout({ post }: Props): JSX.Element {
  const { locale } = useRouter()
  const { t } = useI18n<MyLocale>()

  const flayyer = new FlayyerIO({
    tenant: 'danestves',
    deck: 'danestves',
    template: 'blog',
    variables: {
      image: post.cover.url,
      title: post.seo?.title,
      date: post.published,
      dateLegend: t('blog.publishedAt'),
      lang: locale,
    },
    meta: {
      id: post.slug,
    },
  })

  return (
    <>
      <SEO
        isTemplate={false}
        title={post.seo?.title}
        description={post.seo?.description}
        shareImage={flayyer.href()}
        type="article"
        date={new Date(post.published).toISOString().slice(0, 19)}
      >
        <meta property="profile:first_name" content="Daniel" />
        <meta property="profile:last_name" content="Esteves" />
      </SEO>

      <ArticleJsonLd
        url={window.location.href}
        title={post.seo?.title as string}
        images={[flayyer.href()]}
        datePublished={new Date(post.published).toISOString().slice(0, 19)}
        dateModified={new Date(post.updatedAt).toISOString().slice(0, 19)}
        authorName={['Daniel Esteves']}
        publisherName="Daniel Esteves"
        publisherLogo="https://danestves.com/logo.png"
        description={post.seo?.description as string}
      />

      <article className="container px-5 py-16">
        <div className="container">
          <div className="mx-auto text-center text-white lg:w-3/4 xl:w-2/3">
            <h1 className="mb-20 text-3xl font-semibold sm:text-5xl md:text-7xl">{post.title}</h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <GraphCmsImage
            image={post.cover as Asset}
            alt={post.title}
            outerWrapperClassName="overflow-hidden shadow-xl rounded-2xl"
            withWebp
          />

          <div className="flex justify-center my-8">
            <div className="flex items-center space-x-4 divide-x-2 divide-white">
              <Image
                src="/me.jpg"
                width={75}
                height={75}
                className="rounded-full"
                alt="Daniel Esteves"
              />

              <div className="pl-4">
                <h2 className="text-lg font-semibold text-white">Daniel Esteves</h2>
                <p className="text-white capitalize">
                  {formatDate(
                    new Date(post.published).toISOString().slice(0, 19),
                    'MMMM d, yyyy',
                    locale
                  )}
                </p>
                <p className="text-white">
                  {readingTime({ wordCount: post.body.split(/\s+/gu).length, lang: locale })}
                </p>
                <p className="text-white">
                  <ViewsCounter slug={post.slug} />
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-lg p-4 ml-auto rounded-md bg-blue-50">
            <div className="flex">
              <div className="flex-shrink-0">
                {/* Heroicon name: solid/information-circle */}
                <svg
                  className="w-5 h-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 ml-3 md:flex md:justify-between">
                <p className="text-sm text-blue-700">{t('blog.alert.text')}</p>
                <p className="mt-3 text-sm md:mt-0 md:ml-6">
                  <Link
                    href={`/blog/${post.localizations[0].slug}-${post.localizations[0].id}`}
                    locale={post.localizations[0].locale}
                    className="font-medium text-blue-700 whitespace-nowrap hover:text-blue-600"
                  >
                    {t('blog.alert.button.label')} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto mt-8">
          <div className="max-w-full prose prose-lg">
            {hydrate(post.mdx, {
              components: MDXComponents,
            })}
          </div>

          <Subscribe />

          <div className="flex items-center justify-start mt-6 space-x-3">
            <a
              href={editUrl(post.slug, locale as string)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              {t('blog.editOnGitHub')}
            </a>
            <a
              href={discussUrl(post.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              {t('blog.commentOnTwitter')}
            </a>
          </div>
        </div>
      </article>
    </>
  )
}
