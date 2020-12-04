// Dependencies
import * as React from 'react'
import { NextPage, GetServerSideProps } from 'next'

// Components
import { SEO, Pagination } from '@/components'

// Interfaces
import { Blog } from '@/interfaces'

// Utils
import { getPosts } from '@/utils/api'

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

      {posts && (
        <div className="container px-5">
          <div className="card-list">{(posts as Blog[]).map((post) => post.title).join(', ')}</div>

          <Pagination model="blog" count={count} page={page} />
        </div>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1 } }) => {
  const start = +page === 1 ? 0 : (+page - 1) * 4

  const res = await getPosts(4, start)

  return {
    props: {
      posts: res?.posts || [],
      page: +page,
      count: res?.count || 0,
    },
  }
}

export default BlogPage
