// Dependencies
import * as React from 'react'
import { NextPage, GetStaticProps } from 'next'
import Image from 'graphcms-image'

// Components
import { SEO, Link } from '@/components'

// Interfaces
import { Post } from '@/interfaces'

// Lib
import { getBlogPageData } from '@/lib/graphcms'

// Utils
import { formatDate } from '@/utils'

type BlogPageProps = {
  featuredPost: Post
  posts: [Post]
}

const BlogPage: NextPage<BlogPageProps> = ({ featuredPost, posts }) => {
  // Render
  return (
    <>
      <SEO
        title="Blog"
        description="Blog sobre noticias, tutoriales, paso a paso para crear funciones que nos ayudarán en nuestro desarrollo y mucho más de la mano de @danestves usando JavaScript."
      />

      <div className="container max-w-screen-xl px-5">
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="group">
            <div className="items-center max-w-lg gap-12 mx-auto lg:grid lg:grid-cols-12 lg:max-w-none">
              <div className="lg:col-span-7">
                <div className="w-full overflow-hidden duration-200 transform rounded group-hover:shadow-lg group-focus:shadow-lg group-hover:-translate-y-1 group-focus:-translate-y-1">
                  <Image
                    // eslint-disable-next-line
                    // @ts-ignore
                    image={featuredPost.coverImage}
                    maxWidth={700}
                    outerWrapperClassName="w-full"
                  />
                </div>
              </div>

              <div className="mt-6 lg:col-span-5">
                <h2 className="text-4xl font-semibold leading-tight text-white lg:text-5xl group-hover:underline group-focus:underline">
                  {featuredPost.title}
                </h2>
                <p className="mb-2 text-base text-white lg:text-lg">
                  Publicado en {formatDate(featuredPost.date, 'MMM. d yyy')}
                </p>
                <p className="my-4 text-lg text-white lg:text-xl">{featuredPost.excerpt}</p>
              </div>
            </div>
          </Link>
        )}

        <div className="gap-6 my-24 md:grid md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="mb-12">
              <Link
                href={`/blog/${post.slug}`}
                className="group hover:no-underline focus:no-underline"
              >
                <div className="w-full overflow-hidden duration-200 transform rounded group-hover:shadow-lg group-focus:shadow-lg group-hover:-translate-y-1 group-focus:-translate-y-1">
                  <Image
                    // eslint-disable-next-line
                    // @ts-ignore
                    image={post.coverImage}
                    maxWidth={700}
                    outerWrapperClassName="w-full"
                  />
                </div>

                <div className="mt-6">
                  <p className="my-2 text-xs text-white">
                    Publicado en {formatDate(post.date, 'MMM. d yyy')}
                  </p>

                  <h2 className="mb-2 text-2xl font-medium leading-tight text-white group-hover:underline group-focus:underline">
                    {post.title}
                  </h2>

                  <p className="text-sm text-white">{post.excerpt}</p>
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
  const res = await getBlogPageData()

  return {
    props: {
      ...res,
    },
    revalidate: 1200,
  }
}

export default BlogPage
