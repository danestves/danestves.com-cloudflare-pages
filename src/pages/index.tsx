// Dependencies
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'
import type { I18nProps } from 'next-rosetta'
import type { GetStaticProps, NextPage } from 'next'

// Internals
import HeroBanner from 'public/static/img/hero.jpg'
import { Link, BlogCard, VideoCard } from '@/components'
import { sdk } from '@/lib/graphcms'
import type { Post } from '@/generated/graphql'
import type { YouTubeVideo } from '@/interfaces'
import type { MyLocale } from 'i18n'

interface Props {
  posts: Post[]
  videos?: YouTubeVideo[]
}

const Index: NextPage<Props> = ({ posts, videos }): JSX.Element => {
  const { t } = useI18n<MyLocale>()
  const router = useRouter()

  return (
    <>
      <div className="dark:bg-secondary-500 relative overflow-hidden bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="dark:bg-secondary-500 sm:pb-16 md:pb-20 lg:pb-28 lg:w-full lg:max-w-2xl xl:pb-32 relative z-10 pb-8 bg-white">
            <svg
              aria-hidden="true"
              className="dark:text-secondary-500 lg:block absolute inset-y-0 right-0 hidden w-32 h-full text-white transform translate-x-1/2"
              fill="currentColor"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="sm:px-6 sm:pt-16 lg:px-8 lg:pt-20 xl:pt-28 max-w-screen-xl px-4 pt-24 mx-auto">
              <div className="sm:text-center lg:text-left">
                <h1 className="dark:text-gray-200 sm:text-5xl md:text-6xl text-4xl font-extrabold tracking-tight text-gray-900">
                  <span className="xl:inline block">Daniel Esteves</span>{' '}
                  <span className="text-primary-600 dark:text-primary-500 xl:inline block">
                    frontend developer
                  </span>
                </h1>
                <p className="dark:text-gray-300 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0 mt-3 text-base text-gray-500">
                  Lead Frontend Developer @{' '}
                  <a
                    className="text-primary-700 dark:text-primary-500 underline"
                    href="https://seeed.us"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Seeed
                  </a>
                  . {t('home.summary')} <b>LATAM</b>
                </p>
                <div className="sm:flex sm:justify-center sm:mt-8 lg:justify-start mt-5">
                  <div className="rounded-md shadow">
                    <Link
                      className="flex justify-center items-center py-3 w-full min-w-[160px] text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md border border-transparent md:text-lg"
                      href="/blog"
                      locale={router.locale}
                    >
                      Blog
                    </Link>
                  </div>
                  <div className="sm:mt-0 sm:ml-3 mt-3">
                    <Link
                      className="flex justify-center items-center py-3 w-full min-w-[160px] text-base font-medium text-primary-700 bg-primary-100 hover:bg-primary-200 rounded-md border border-transparent md:text-lg"
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
        <div className="lg:flex lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            alt="Daniel Esteves"
            className="sm:h-72 md:h-96 lg:w-full lg:h-full object-cover w-full h-56"
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            src={HeroBanner}
          />
        </div>
      </div>

      {videos?.length && (
        <div className="py-6 w-full bg-[#f9f9f9] dark:bg-[#181818] border-t border-black dark:border-white border-opacity-10 dark:border-opacity-10">
          <div className="container px-5 mb-10">
            <div className="flex flex-row justify-between my-6">
              <h2 className="flex flex-row self-center font-roboto text-[20px] font-bold text-black dark:text-white">
                {t('home.videos.title')}
              </h2>
            </div>

            <div className="sm:grid-cols-2 md:grid-cols-4 grid grid-cols-1 gap-4">
              {videos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-full py-12">
        <div className="container max-w-screen-xl px-5">
          <h2 className="dark:text-primary text-3xl font-bold text-center text-gray-700">
            {t('home.posts.title')}
          </h2>

          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {posts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const posts = await sdk()
    .getAllPostsForBlogPage({
      body: false,
      limit: 3,
      locale: locale as any,
      search: '',
    })
    .then(({ data }) => data.posts)

  const getUrl = (
    source = '/playlistItems?part=contentDetails&playlistId=UU6YYVDKZC3mu1iB8IOCFqcw&maxResults=4'
  ) => {
    return `https://www.googleapis.com/youtube/v3${source}&key=${process.env.YOUTUBE_API_KEY}`
  }

  const latestVideos = await fetch(getUrl()).then((response) => response.json())
  const ids =
    latestVideos?.items?.map((video: any) => {
      return video?.contentDetails?.videoId
    }) || undefined
  const videos = await fetch(
    getUrl(`/videos?part=snippet,statistics&id=${ids.join(',')}`)
  ).then((response) => response.json())

  return {
    props: {
      table,
      posts,
      videos: videos.items,
    },
    revalidate: 60 * 60, // 1 hour
  }
}

export default Index
