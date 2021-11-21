// Dependencies
import { allEnglishPosts, allSpanishPosts } from '.contentlayer/data'
import type { EnglishPost, SpanishPost } from '.contentlayer/types'
import type { I18nProps } from 'next-rosetta'
import type { GetStaticProps, NextPage } from 'next'

// Internals
import {
  CallToAction,
  Hero,
  LatestPosts,
  LatestVideos,
} from '@/components/Sections'
import { Videos } from '@/interfaces'
import { getVideos } from '@/lib/youtube'
import { pick } from '@/utils/pick'
import type { Locale } from 'i18n'

export type HomePageProps = {
  videos: Videos
  posts: EnglishPost[] | SpanishPost[]
}

export const HomePage: NextPage<HomePageProps> = ({ posts, videos }) => {
  return (
    <>
      <Hero />
      <LatestVideos {...videos} />
      <LatestPosts posts={posts} />
      <CallToAction />
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const videos = await getVideos()
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
    props: {
      table,
      posts: posts.slice(0, 3),
      videos,
    },
    revalidate: 60 * 60, // 1 hour
  }
}

export default HomePage
