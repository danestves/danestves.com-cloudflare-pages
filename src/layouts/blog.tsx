// Dependencies
import { FlayyerIO } from '@flayyer/flayyer'
import GraphCmsImage from '@graphcms/react-image'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { window } from 'browser-monads-ts'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import { ArticleJsonLd } from 'next-seo'
import { useI18n } from 'next-rosetta'

// Internals
import { SEO, ViewCounter, Subscribe, Link } from '@/components'
import MDXComponents from '@/components/MDXComponents'
import { formatDate, readingTime } from '@/utils'
import type { Post } from '@/generated/graphql'
import type { Asset } from '@/interfaces'
import type { MyLocale } from 'i18n'

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
    mdx: {
      compiledSource: string
    }
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
        date={new Date(post.published).toISOString().slice(0, 19)}
        description={post.seo?.description}
        isTemplate={false}
        shareImage={flayyer.href()}
        title={post.seo?.title}
        type="article"
      >
        <meta content="Daniel" property="profile:first_name" />
        <meta content="Esteves" property="profile:last_name" />
      </SEO>

      <ArticleJsonLd
        authorName={['Daniel Esteves']}
        dateModified={new Date(post.updatedAt).toISOString().slice(0, 19)}
        datePublished={new Date(post.published).toISOString().slice(0, 19)}
        description={post.seo?.description as string}
        images={[flayyer.href()]}
        publisherLogo="https://danestves.com/logo.png"
        publisherName="Daniel Esteves"
        title={post.seo?.title as string}
        url={window.location.href}
      />

      <article className="container px-5 py-16">
        <div className="container">
          <div className="mx-auto text-center dark:text-white lg:w-3/4 xl:w-2/3">
            <h1 className="mb-20 text-3xl font-semibold sm:text-5xl md:text-[5rem]">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <GraphCmsImage
            alt={post.title}
            image={post.cover as Asset}
            outerWrapperClassName="overflow-hidden shadow-xl rounded-[2rem]"
            withWebp
          />

          <div className="flex justify-center my-8">
            <div className="flex items-center space-x-4 divide-x-2 divide-gray-300 dark:divide-white">
              <Image
                alt="Daniel Esteves"
                className="rounded-full"
                height={75}
                src="/me.jpg"
                width={75}
              />

              <div className="pl-4">
                <h2 className="font-sans text-lg font-semibold text-gray-700 dark:text-white">
                  Daniel Esteves
                </h2>
                <p className="text-gray-500 capitalize dark:text-white">
                  {formatDate(
                    new Date(post.published).toISOString().slice(0, 19),
                    'MMMM d, yyyy',
                    locale
                  )}
                </p>
                <p className="text-gray-500 dark:text-white">
                  {readingTime({
                    wordCount: post.body.split(/\s+/gu).length,
                    lang: locale,
                  })}
                </p>
                <p className="text-gray-500 dark:text-white">
                  <ViewCounter slug={post.slug} />
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-lg p-4 ml-auto bg-blue-100 rounded-md dark:bg-blue-50">
            <div className="flex">
              <div className="flex-shrink-0">
                {/* Heroicon name: solid/information-circle */}
                <InformationCircleIcon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 ml-3 md:flex md:justify-between">
                <p className="text-sm text-blue-700">{t('blog.alert.text')}</p>
                <p className="mt-3 text-sm md:mt-0 md:ml-6">
                  <Link
                    className="font-medium text-blue-700 whitespace-nowrap hover:text-blue-600"
                    href={`/blog/${post.localizations[0].slug}-${post.localizations[0].id}`}
                    locale={post.localizations[0].locale}
                  >
                    {t('blog.alert.button.label')}{' '}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto mt-8">
          <div className="max-w-full prose prose-lg dark:prose-dark">
            <MDXRemote
              compiledSource={post.mdx.compiledSource}
              components={MDXComponents}
            />
          </div>

          <Subscribe />

          <div className="flex items-center justify-start mt-6 space-x-3">
            <a
              className="text-white underline"
              href={editUrl(post.slug, locale as string)}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t('blog.editOnGitHub')}
            </a>
            <a
              className="text-white underline"
              href={discussUrl(post.slug)}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t('blog.commentOnTwitter')}
            </a>
          </div>
        </div>
      </article>
    </>
  )
}
