// Dependencies
import { NextPage, GetStaticProps } from 'next'
import Image from 'next/image'
import { useI18n, I18nProps } from 'next-rosetta'
import { useRouter } from 'next/dist/client/router'
import { getAllNodes } from 'next-mdx/server'

// Components
import { SEO, Link, BlogCard } from '@/components'

// Interface
import { Post } from '@/interfaces'

// Locales
import type { MyLocale } from 'i18n'

// Utils
import { formatDate } from '@/utils'

interface Props {
  featuredPost: Post
  posts: Post[]
}

const BlogPage: NextPage<Props> = ({ featuredPost, posts }) => {
  const { t } = useI18n<MyLocale>()
  const { locale } = useRouter()

  return (
    <>
      <SEO title={t('blog.seo.title')} description={t('blog.seo.description')} />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Blog</h1>
        </div>
      </section>

      <div className="container max-w-screen-xl px-5">
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} locale={locale} className="group">
            <div className="items-center max-w-lg gap-12 mx-auto lg:grid lg:grid-cols-12 lg:max-w-none">
              <div className="lg:col-span-7">
                <div className="flex w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg group-focus:shadow-lg group-hover:-translate-y-1 group-focus:-translate-y-1">
                  <Image
                    src={featuredPost.frontMatter.image}
                    width={714}
                    height={454}
                    alt={featuredPost.frontMatter.title}
                  />
                </div>
              </div>

              <div className="mt-6 lg:col-span-5">
                <h2 className="text-4xl font-semibold leading-tight text-white lg:text-5xl group-hover:underline group-focus:underline">
                  {featuredPost.frontMatter.title}
                </h2>
                <p className="mb-2 text-base text-white lg:text-lg">
                  {t('blog.publishedAt')}{' '}
                  {formatDate(
                    new Date(featuredPost.frontMatter.publishedAt).toISOString().slice(0, 19),
                    'MMM. d yyy',
                    locale
                  )}
                </p>
                <p className="my-4 text-lg text-white lg:text-xl">
                  {featuredPost.frontMatter.summary}
                </p>
              </div>
            </div>
          </Link>
        )}

        <div className="gap-6 my-24 md:grid md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (context) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  // @ts-ignore: the type has the required values
  const posts = await getAllNodes<Post>(`blog/${locale}`)
  const sortedPosts = posts.sort((a: Post, b: Post) => {
    return (
      new Date(b.frontMatter.publishedAt).getTime() - new Date(a.frontMatter.publishedAt).getTime()
    )
  })

  return {
    props: {
      table,
      featuredPost: sortedPosts.shift(),
      posts: sortedPosts,
    },
  }
}

export default BlogPage
