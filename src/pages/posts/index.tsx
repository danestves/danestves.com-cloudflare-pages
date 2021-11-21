// Dependencies
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'
import { allEnglishPosts, allSpanishPosts } from '.contentlayer/data'
import type { EnglishPost, SpanishPost } from '.contentlayer/types'
import type { GetStaticProps, NextPage } from 'next'
import type { I18nProps } from 'next-rosetta'

// Internals
import { ContentCard, Link, Seo } from '@/components'
import { pick } from '@/utils/pick'
import type { Locale } from 'i18n'

export type PostsPageProps = {
  posts: EnglishPost[] | SpanishPost[]
}

export const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  const router = useRouter()
  const { t } = useI18n<Locale>()

  return (
    <>
      <Seo
        description={t('pages.posts.seo.description')}
        title={t('pages.posts.seo.title')}
      />
      <section className="w-full py-32">
        <h1 className="text-[26px] text-secondary-darker font-black text-center uppercase dark:text-secondary">
          Blog{' '}
          <span aria-label="victory hand" role="img">
            ✌️
          </span>
        </h1>

        <div className="container mt-5 max-w-[977px] mx-auto">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: EnglishPost | SpanishPost, index) => (
              <ContentCard
                as={Link}
                className="p-1 overflow-hidden transition-colors duration-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:ring-offset-2 focus:ring-offset-primary"
                date={post.publishedAt}
                description={post.seo?.description}
                descriptionClassName="line-clamp-3"
                href={`/posts/${post.slug}`}
                image={post.cover}
                key={nanoid()}
                locale={router.locale}
                priorityImage={index <= 2}
                title={post.title}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  let posts: Record<string, unknown>[]

  switch (locale) {
    case 'es':
      posts = allSpanishPosts
        .map((post) => {
          return pick(post, ['cover', 'publishedAt', 'seo', 'slug', 'title'])
        })
        .sort((a, b) => {
          return (
            Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
          )
        })
      break
    default:
      posts = allEnglishPosts
        .map((post) => {
          return pick(post, ['cover', 'publishedAt', 'seo', 'slug', 'title'])
        })
        .sort((a, b) => {
          return (
            Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
          )
        })
      break
  }

  return {
    props: { table, posts },
    revalidate: 60 * 60, // 1 hour
  }
}

export default PostsPage
