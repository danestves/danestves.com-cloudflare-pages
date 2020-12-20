// Dependencies
import * as React from 'react'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Image from 'graphcms-image'
import { ArticleJsonLd } from 'next-seo'
import { window } from 'browser-monads'
import NextImage from 'next/image'
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa'

// Components
import { SEO } from '@/components'
import Markdown from '@/components/Markdown'

// Interfaces
import { Post } from '@/interfaces'

// Lib
import { getAllPostsWithSlug, getPostBySlug } from '@/lib/graphcms'

// Utils
import { openGraphImgGenerator, formatDate, readingTime } from '@/utils'

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
    url: openGraphImgGenerator(post.title, post.tags),
    width: 1200,
    height: 630,
    alt: post.seo.title,
  }

  return (
    <>
      <SEO title={post.seo.title} description={post.seo.description} shareImage={shareImage} />
      <ArticleJsonLd
        url={window.location.href}
        title={post.title}
        images={[openGraphImgGenerator(post.title, post.tags)]}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        authorName={['Daniel Esteves']}
        publisherName="Daniel Esteves"
        publisherLogo="https://danestves.com/logo.png"
        description={post.seo.description}
      />

      <article className="container px-5 py-16">
        <article className="container">
          <div className="mx-auto text-center text-white lg:w-3/4 xl:w-2/3">
            <h1 className="mb-20 text-3xl font-semibold sm:text-5xl md:text-7xl">{post.title}</h1>
          </div>
        </article>

        <div className="max-w-5xl mx-auto">
          <Image
            image={post.coverImage}
            maxWidth={400}
            outerWrapperClassName="rounded-2xl shadow-xl overflow-hidden"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center my-8">
            <div className="flex items-center space-x-4 divide-x-2 divide-white">
              <NextImage src="/me.jpg" width={75} height={75} className="rounded-full" />

              <div className="pl-4">
                <h2 className="text-lg font-semibold text-white">Daniel Esteves</h2>
                <p className="text-white capitalize">
                  {formatDate(post.publishedAt, 'MMMM d, yyyy')}
                </p>
                <p className="text-white">{readingTime(post.content)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Share */}
          <div className="mb-8 md:mb-0 md:absolute md:top-0 md:bottom-0 md:left-0 md:transform md:-translate-x-full md:-mt-12">
            <div className="flex flex-wrap -mx-2 overflow-hidden border border-white rounded-md md:sticky md:top-0 md:flex-col md:mx-8">
              <h2 className="flex-1 w-full text-xs font-bold text-center uppercase bg-white md:flex-auto text-secondary">
                share
              </h2>

              <div className="flex flex-row justify-center w-full md:w-auto md:flex-col">
                <a
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title} por @danestves`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="sr-only">Share on Twitter</p>
                  <span className="grid w-12 h-12 p-1 m-2 transition-all duration-200 transform rounded cursor-pointer place-items-center">
                    <FaTwitter className="text-3xl text-white" />
                  </span>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title} por @danestves&summary=&source=`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="sr-only">Share on Linkedin</p>
                  <span className="grid w-12 h-12 p-1 m-2 transition-all duration-200 transform rounded cursor-pointer place-items-center">
                    <FaLinkedinIn className="text-3xl text-white" />
                  </span>
                </a>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${window.location.href}&media=undefined&description=${post.title} por @danestves`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="sr-only">Share on Pinterest</p>
                  <span className="grid w-12 h-12 p-1 m-2 transition-all duration-200 transform rounded cursor-pointer place-items-center">
                    <FaPinterestP className="text-3xl text-white" />
                  </span>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="sr-only">Share on Facebook</p>
                  <span className="grid w-12 h-12 p-1 m-2 transition-all duration-200 transform rounded cursor-pointer place-items-center">
                    <FaFacebookF className="text-3xl text-white" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <Markdown markdown={post.content} />
        </div>
      </article>
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
      post,
    },
  }
}

export default BlogPage
