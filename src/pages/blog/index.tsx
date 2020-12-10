// Dependencies
import * as React from 'react'
import { NextPage, GetStaticProps } from 'next'
import Image from 'next/image'

// Components
import { SEO, Link } from '@/components'

// Interfaces
import { Post } from '@/interfaces'

// Utils
import { getBlogPageData } from '@/lib/graphcms'

type BlogPageProps = {
  featuredPost: Post
  posts: [Post]
}

const BlogPage: NextPage<BlogPageProps> = ({ featuredPost }) => {
  // Render
  console.log(featuredPost)

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
                    src={featuredPost.coverImage.url}
                    alt={featuredPost.title}
                    width={700}
                    height={470}
                    layout="responsive"
                  />
                </div>
              </div>

              <div className="mt-6 lg:col-span-5">
                <h2 className="text-4xl leading-tight text-white group-hover:underline group-focus:underline">
                  {featuredPost.title}
                </h2>
                <p className="text-xs text-white tmy-2">Publicado {featuredPost.createdAt}</p>
                <p className="my-2 text-xs text-white">{featuredPost.excerpt}</p>
              </div>
            </div>
          </Link>
        )}
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
