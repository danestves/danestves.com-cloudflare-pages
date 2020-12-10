// Dependencies
import * as React from 'react'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

// Components
import { SEO, LazyImage } from '@/components'

// Interfaces
import { Post } from '@/interfaces'

// Lib
import { getAllPostsWithSlug, getPostBySlug } from '@/lib/graphcms'

// Utils
import opengraphimg from '@/utils/generator'
import { generateLazyImage } from '@/utils/generateLazyImage'

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

      <div className="relative -mt-20 transition-all duration-150" style={{ zIndex: -1 }}>
        <LazyImage
          src={post.lazyCoverImage.src}
          alt={post.title}
          lqip={post.lazyCoverImage.lqip}
          aspectRatio={post.lazyCoverImage.aspectRatio}
        />
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
  const coverImage = await generateLazyImage(post.coverImage.url)

  return {
    props: {
      preview,
      post: {
        ...post,
        lazyCoverImage: coverImage,
      },
    },
  }
}

export default BlogPage
