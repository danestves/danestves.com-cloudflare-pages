// Dependencies
import * as React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Image from 'next/image'

// Components
import { SEO, Link, Emoji, Pagination } from '@/components'

// Interfaces
import { Blog } from '@/interfaces'

// Utils
import { getPosts } from '@/utils/api'
import removeMarkdown from '@/utils/removeMarkdown'
import readingTime from '@/utils/readingTime'
import imageGenerator from '@/utils/generator'

interface BlogPageProps {
  posts: Blog[]
  page: number
  count: number
}

const BlogPage: NextPage<BlogPageProps> = ({ posts, count, page }) => {
  // Render
  return (
    <>
      <SEO
        title="Blog"
        description="Blog sobre noticias, tutoriales, paso a paso para crear funciones que nos ayudarán en nuestro desarrollo y mucho más de la mano de @danestves usando JavaScript."
      />

      <div className="w-full py-16">
        <div className="container max-w-5xl px-5">
          <div className="grid grid-cols-1 gap-8">
            {(posts as Blog[]).map((post, index) => (
              <div
                key={post.id}
                className="flex flex-wrap w-full overflow-hidden rounded-lg shadow-lg"
              >
                <div className="w-full md:w-1/2">
                  <Link href={`/blog/${post.slug}/`} className="flex h-full" title={post.title}>
                    <Image
                      src={imageGenerator(post.title, post.tags)}
                      alt={post.title}
                      width={1200}
                      height={630}
                    />
                  </Link>
                </div>

                <div
                  className={`flex flex-col justify-between w-full p-6 transition-all duration-200 bg-white md:w-1/2 ${
                    !(index % 2) ? 'md:order-first' : ''
                  }`}
                >
                  <div className="flex-1">
                    <p className="overflow-x-scroll text-sm font-medium leading-5 transition-all duration-200 text-tertiary">
                      {post.tags?.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/tags/${tag.name}/`}
                          className="mx-2 first:ml-0 last:mr-0"
                          title={`#${tag.name}`}
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="block">
                      <h3
                        className="mt-2 text-xl font-semibold leading-7 text-gray-900 transition-all duration-200"
                        title={post.title}
                      >
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-3 leading-6 text-gray-500 text-opacity-75">
                      {removeMarkdown(post.body.substr(0, 120))}
                      ...
                    </p>
                  </div>

                  <div className="grid items-center grid-cols-2 mt-3">
                    <div>
                      <p className="text-center">
                        <Emoji emoji="📅" className="mr-1" />

                        <time className="ml-1 text-sm text-tertiary" dateTime={post.createdAt}>
                          {format(new Date(post.createdAt), 'MMM. dd yyyy', { locale: es })}
                        </time>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-center text-tertiary">
                        <Emoji emoji="⏱" className="mr-1" /> {readingTime(post.body)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination model="blog" count={count} page={page} limit={6} />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1 } }) => {
  const start = +page === 1 ? 0 : (+page - 1) * 6

  const res = await getPosts(6, start)

  return {
    props: {
      posts: res?.posts || [],
      page: +page,
      count: res?.count || 0,
    },
  }
}

export default BlogPage
