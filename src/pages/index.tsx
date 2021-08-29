// Dependencies
import type { I18nProps } from 'next-rosetta'
import type { GetStaticProps, NextPage } from 'next'

// Internals
import { Hero, LatestPosts, LatestVideos } from '@/components/Sections'
import { Videos } from '@/interfaces'
import { getVideos, sdk } from '@/lib'
import type { PostsQuery } from '@/generated/graphql'
import type { Locale } from 'i18n'

export type HomePageProps = {
  videos: Videos
  posts: PostsQuery['posts']
}

export const HomePage: NextPage<HomePageProps> = ({ posts, videos }) => {
  return (
    <>
      <Hero />
      <LatestVideos {...videos} />
      <LatestPosts posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const videos = await getVideos()
  const posts = await sdk().posts({
    first: 3,
    locale: locale as any,
  })

  return { props: { table, posts: posts.data.posts, videos } }
}

export default HomePage
