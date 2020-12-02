// Dependencies
import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import ErrorPage from 'next/error'

// Interfaces
import { Blog } from '@/interfaces'

// Utils
import { getStrapiURL, getBlogData } from '@/utils/api'

type DynamicBlogProps = {
  blog: Blog | null
}

const DynamicBlog: React.FC<DynamicBlogProps> = ({ blog }) => {
  // Hooks
  const router = useRouter()

  // Render

  /**
   * Check if the required data was provided
   */
  if ((!router.isFallback && !blog) || !blog) {
    return <ErrorPage statusCode={404} />
  }

  /**
   * Loading screen (only possible in preview mode)
   */
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  /**
   * Load content of the blog when data exist
   */
  return <>Hello World</>
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all pages from Strapi
  const blogs = await (await fetch(getStrapiURL('/blogs'))).json()
  const paths = blogs.map((blog: Blog) => {
    // Decompose the slug that was saved in Strapi
    const slugArray = blog.slug.split('__')

    return {
      params: { slug: slugArray },
    }
  })

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Find the page data for the current slug
  let chainedSlugs

  if (params == {} || !params?.slug) {
    // To get the homepage, find the only page where slug is an empty string
    chainedSlugs = ``
  } else {
    // Otherwise find a page with a matching slug
    // Recompose the slug that was saved in Strapi
    // eslint-disable-next-line
    // @ts-ignore
    chainedSlugs = params.slug.join('__')
  }
  // Fetch pages. Include drafts if preview mode is on
  const blogData = await getBlogData(chainedSlugs)

  if (blogData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const data = blogData

  return {
    props: {
      blog: data,
    },
  }
}

export default DynamicBlog
