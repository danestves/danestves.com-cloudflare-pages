// Dependencies
import * as React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/dist/client/router'

// Components
import { SEO } from '@/components'

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
  const router = useRouter()

  // Render
  const lastPage = Math.ceil(count / 4)

  return (
    <>
      <SEO
        title="Blog"
        description="Blog sobre noticias, tutoriales, paso a paso para crear funciones que nos ayudarán en nuestro desarrollo y mucho más de la mano de @danestves usando JavaScript."
      />

      {/* {loading && <p>Loading...</p>} */}

      {posts && (
        <div className="container px-5">
          <div className="card-list">{(posts as Blog[]).map((post) => post.title).join(', ')}</div>

          <button onClick={() => router.push(`/blog?page=${page - 1}`)} disabled={page <= 1}>
            Previous
          </button>
          <button onClick={() => router.push(`/blog?page=${page + 1}`)} disabled={page >= lastPage}>
            Next
          </button>
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
