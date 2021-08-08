// Dependencies
import Image from '@graphcms/react-image'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'
import type { I18nProps } from 'next-rosetta'
import type { NextPage, GetStaticProps } from 'next'

// Internals
import { SEO, Link, BlogCard } from '@/components'
import { sdk } from '@/lib/graphcms'
import { formatDate } from '@/utils'
import type { Post } from '@/generated/graphql'
import type { Asset } from '@/interfaces'
import type { MyLocale } from 'i18n'

interface Props {
  featuredPost: Post
  posts: Post[]
}

const BlogPage: NextPage<Props> = ({ featuredPost, posts }) => {
  const { t } = useI18n<MyLocale>()
  const { locale } = useRouter()

  return (
    <>
      <SEO
        description={t('blog.seo.description')}
        title={t('blog.seo.title')}
      />

      <section className="container">
        <div className="lg:w-3/4 xl:w-2/3 mx-auto my-20 text-center">
          <h1 className="dark:text-white sm:text-5xl md:text-6xl mb-10 text-4xl font-bold text-gray-900">
            Blog
          </h1>
        </div>
      </section>

      <div className="container max-w-screen-xl px-5">
        {featuredPost && (
          <Link
            className="group"
            href={`/blog/${featuredPost.slug}-${featuredPost.id}`}
            locale={locale}
          >
            <div className="lg:grid lg:grid-cols-12 lg:max-w-none items-center max-w-lg gap-12 mx-auto">
              <div className="lg:col-span-7">
                <div className="group-hover:shadow-lg group-focus:shadow-lg group-hover:-translate-y-1 group-focus:-translate-y-1 flex w-full overflow-hidden duration-200 transform rounded-lg">
                  <Image
                    alt={featuredPost.title}
                    image={featuredPost.cover as Asset}
                    outerWrapperClassName="w-full"
                    withWebp
                  />
                </div>
              </div>

              <div className="lg:col-span-5 mt-6">
                <h2 className="dark:text-white group-hover:underline group-focus:underline lg:text-5xl text-4xl font-semibold leading-tight text-gray-700">
                  {featuredPost.title}
                </h2>
                <p className="dark:text-gray-400 lg:text-lg mb-2 text-base text-gray-500">
                  {t('blog.publishedAt')}{' '}
                  {formatDate(
                    new Date(featuredPost.published).toISOString().slice(0, 19),
                    'MMM. d yyy',
                    locale
                  )}
                </p>
                <p className="dark:text-gray-300 lg:text-xl my-4 text-lg text-gray-600">
                  {featuredPost.seo?.description}
                </p>
              </div>
            </div>
          </Link>
        )}

        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-24">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
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
  const data = await sdk()
    .getAllPostsForBlogPage({
      body: false,
      limit: 100,
      locale: locale as any,
      search: '',
    })
    .then((data) => data.data)

  return {
    props: {
      table,
      featuredPost: data.posts.shift(),
      posts: data.posts,
    },
  }
}

export default BlogPage
