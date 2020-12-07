// Dependencies
import * as React from 'react'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Image from 'next/image'

// Components
import { SEO } from '@/components'

// Interfaces
import { Post } from '@/interfaces'

// Lib
import { getAllPostsWithSlug, getPostBySlug } from '@/utils/graphcms'

// Utils
import opengraphimg from '@/utils/generator'

type BlogPageProps = {
  preview: boolean
  post: Post
}

const BlogPage: NextPage<BlogPageProps> = ({ post }) => {
  // Hooks
  const router = useRouter()

  // Render
  if (router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const shareImage = {
    url: opengraphimg(post.title, post.tags),
    width: 1200,
    height: 630,
    alt: post.seo.title,
  }

  return (
    <>
      <SEO
        title={post.seo.title}
        description={post.seo.description}
        openGraph={{ images: [shareImage] }}
      />

      <div
        className="relative h-40 -mt-20 transition-all duration-150 md:h-80"
        style={{ zIndex: -1 }}
      >
        <Image src={post.coverImage.url} alt={post.title} layout="fill" objectFit="cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPostsWithSlug()

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const post = await getPostBySlug(params?.slug as string, preview)

  return {
    props: {
      preview,
      post: post,
    },
  }
}

export default BlogPage
