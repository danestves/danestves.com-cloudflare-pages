// Dependencies
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useI18n, I18nProps } from 'next-rosetta'
import { useRouter } from 'next/router'
import { google, youtube_v3 } from 'googleapis'

// @types
import { Post, Locale } from '@/generated/graphql'

// Components
import { Link, BlogCard, VideoCard } from '@/components'

// Libraries
import { getAllPostsForBlogPage } from '@/lib/graphcms'
import googleAuth from '@/lib/google/auth'

// Locales
import type { MyLocale } from 'i18n'

interface Props {
  posts: Post[]
  videos?: youtube_v3.Schema$Video[]
}

const Index: NextPage<Props> = ({ posts, videos }): JSX.Element => {
  const { t } = useI18n<MyLocale>()
  const router = useRouter()

  return (
    <>
      <div className="relative overflow-hidden bg-white dark:bg-secondary-500">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative z-10 pb-8 bg-white dark:bg-secondary-500 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              aria-hidden="true"
              className="absolute inset-y-0 right-0 hidden w-32 h-full text-white transform translate-x-1/2 dark:text-secondary-500 lg:block"
              fill="currentColor"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="max-w-screen-xl px-4 pt-24 mx-auto sm:pt-16 sm:px-6 lg:pt-20 lg:px-8 xl:pt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Daniel Esteves</span>{' '}
                  <span className="block text-primary-600 dark:text-primary-500 xl:inline">
                    frontend developer
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Lead Frontend Developer @{' '}
                  <a
                    className="underline text-primary-700 dark:text-primary-500"
                    href="https://seeed.us"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Seeed
                  </a>
                  . {t('home.summary')} <b>LATAM</b>
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      className="flex items-center justify-center w-full py-3 text-base font-medium text-white border border-transparent rounded-md bg-primary-600 min-w-[160px] hover:bg-primary-700 md:text-lg"
                      href="/blog"
                      locale={router.locale}
                    >
                      Blog
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      className="flex items-center justify-center w-full py-3 text-base font-medium border border-transparent rounded-md text-primary-700 bg-primary-100 min-w-[160px] hover:bg-primary-200 md:text-lg"
                      href="/contacto"
                      locale={router.locale}
                    >
                      {t('home.buttons.contact.label')}
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:flex">
          <Image
            alt="Daniel Esteves"
            className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full"
            height={831}
            objectFit="cover"
            objectPosition="Center"
            src="/static/img/hero.jpg"
            width={1432}
          />
        </div>
      </div>

      {videos?.length && (
        <div className="w-full py-6 bg-[#f9f9f9] border-t border-black border-opacity-10 dark:bg-[#181818] dark:border-white dark:border-opacity-10">
          <div className="container px-5 mb-10">
            <div className="flex flex-row justify-between my-6">
              <h2 className="flex flex-row self-center text-[20px] font-bold font-roboto text-black dark:text-white">
                {t('home.videos.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {videos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-full py-12">
        <div className="container max-w-screen-xl px-5">
          <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-primary">
            {t('home.posts.title')}
          </h2>

          <div className="gap-6 mt-16 md:grid md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (context) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const posts = (await getAllPostsForBlogPage(locale as Locale, 3)).posts

  // Auth with Google and obtain the latest 3 videos from YouTube
  const auth = await googleAuth.getClient()
  const youtube = google.youtube({
    auth,
    version: 'v3',
  })
  const latestVideos = await youtube.playlistItems.list({
    part: ['snippet', 'contentDetails'],
    playlistId: 'UU6YYVDKZC3mu1iB8IOCFqcw', // The "default" playlist where all the videos are
    maxResults: 4,
  })
  const videoIds =
    latestVideos.data?.items?.map((video) => {
      return video?.contentDetails?.videoId
    }) || undefined
  const videos = await youtube.videos.list({
    part: ['snippet', 'statistics'],
    id: videoIds as any,
  })

  return {
    props: {
      table,
      posts,
      videos: videos.data.items,
    },
    revalidate: 60 * 60, // 1 hour
  }
}

export default Index
