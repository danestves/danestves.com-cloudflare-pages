// Dependencies
import * as React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

// Components
import { SEO, Pagination } from '@/components'
import BlogCard from '@/components/Blog/Card'

// Hooks
import { useEntries } from '@/hooks'

// Interfaces
import { Blog } from '@/interfaces'

const BlogPage: NextPage = () => {
  // Hooks
  const { items, loading, isFirstPage, hasPages, handlePrevPage, handleNextPage } = useEntries(
    '/blogs',
    2
  )
  const router = useRouter()

  // Render
  return (
    <>
      <SEO
        title="Blog"
        description="Blog sobre noticias, tutoriales, paso a paso para crear funciones que nos ayudarán en nuestro desarrollo y mucho más de la mano de @danestves usando JavaScript."
      />

      {loading && <p>Loading...</p>}

      {!loading && items && (
        <div className="container px-5">
          <div className="card-list">
            {(items as Blog[]).map((blog) => (
              <BlogCard key={blog.id} isSelected={router?.query.blogId === blog.id} {...blog} />
            ))}
          </div>

          <div className="py-12">
            <Pagination
              isFirstPage={isFirstPage}
              hasPages={hasPages}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default BlogPage
