// Dependencies
import { NextPage, GetStaticProps } from 'next'
import Image from 'next/image'
import renderA11yEmojis from 'markdown-render-a11y-emojis'

// Components
import { SEO, Link } from '@/components'

// Libraries
import { FrontMatterPost } from '@/interfaces'
import { getAllFilesFrontMatter } from '@/lib/mdx'

// Utils
import { formatDate } from '@/utils'

interface Props {
  featuredPost: FrontMatterPost
  posts: FrontMatterPost[]
}

const BlogPage: NextPage<Props> = ({ featuredPost, posts }) => {
  return (
    <>
      <SEO
        title="Blog"
        description="Blog sobre noticias, tutoriales, paso a paso para crear funciones que nos ayudarán en nuestro desarrollo y mucho más de la mano de @danestves usando JavaScript."
      />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Blog</h1>
        </div>
      </section>

      <div className="container max-w-screen-xl px-5">
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="group">
            <div className="items-center max-w-lg gap-12 mx-auto lg:grid lg:grid-cols-12 lg:max-w-none">
              <div className="lg:col-span-7">
                <div className="flex w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg group-focus:shadow-lg group-hover:-translate-y-1 group-focus:-translate-y-1">
                  <Image
                    src={featuredPost.image}
                    width={714}
                    height={414}
                    alt={featuredPost.title}
                  />
                </div>
              </div>

              <div className="mt-6 lg:col-span-5">
                <h2
                  className="text-4xl font-semibold leading-tight text-white lg:text-5xl group-hover:underline group-focus:underline"
                  dangerouslySetInnerHTML={{ __html: renderA11yEmojis(featuredPost.title) }}
                />
                <p className="mb-2 text-base text-white lg:text-lg">
                  Publicado en {formatDate(featuredPost.publishedAt, 'MMM. d yyy')}
                </p>
                <p className="my-4 text-lg text-white lg:text-xl">{featuredPost.summary}</p>
              </div>
            </div>
          </Link>
        )}

        <div className="gap-6 my-24 md:grid md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="mb-12">
              <Link
                href={`/blog/${post.slug}`}
                className="group hover:no-underline focus:no-underline"
              >
                <div className="flex w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg group-focus:shadow-lg group-hover:-translate-y-1 group-focus:-translate-y-1">
                  <Image src={post.image} width={400} height={270} alt={post.title} />
                </div>

                <div className="mt-6">
                  <p className="my-2 text-xs text-white">
                    Publicado en {formatDate(post.publishedAt, 'MMM. d yyy')}
                  </p>

                  <h2
                    className="mb-2 text-2xl font-medium leading-tight text-white group-hover:underline group-focus:underline"
                    dangerouslySetInnerHTML={{ __html: renderA11yEmojis(post.title) }}
                  />
                  <p className="text-sm text-white">{post.summary}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const sortedPosts = posts.sort((a: FrontMatterPost, b: FrontMatterPost) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })

  return {
    props: {
      featuredPost: sortedPosts.shift(),
      posts: sortedPosts,
    },
  }
}

export default BlogPage
