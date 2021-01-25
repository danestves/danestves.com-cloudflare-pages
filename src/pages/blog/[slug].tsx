// Dependencies
import * as React from 'react'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Image from 'graphcms-image'
import { ArticleJsonLd } from 'next-seo'
import { window } from 'browser-monads'
import NextImage from 'next/image'
import * as Icons from 'react-icons/all'

// Components
import { SEO } from '@/components'
import Markdown from '@/components/Markdown'

// Generated
import { Post } from '@/generated/graphql'

// Lib
import { getApolloClient } from '@/lib/apollo'

// Queries
import GET_POST_SLUGS from '@/graphql/postSlugs.query'
import GET_POST from '@/graphql/post.query'

// Utils
import { openGraphImgGenerator, formatDate, readingTime } from '@/utils'

interface Props {
  preview: boolean
  post: Post
}

const BlogPage: NextPage<Props> = ({ post }) => {
  const router = useRouter()

  if (router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <SEO
        title={post.seo?.title as string}
        description={post.seo?.description as string}
        openGraph={{
          images: [
            {
              url: openGraphImgGenerator(post.title, post.tags),
              width: 1200,
              height: 630,
              alt: post.seo?.title,
            },
          ],
          type: 'article',
        }}
      />
      <ArticleJsonLd
        url={window.location.href}
        title={post.title}
        images={[openGraphImgGenerator(post.title, post.tags)]}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        authorName={['Daniel Esteves']}
        publisherName="Daniel Esteves"
        publisherLogo="https://danestves.com/logo.png"
        description={post.seo?.description as string}
      />

      <article className="container px-5 py-16">
        <article className="container">
          <div className="mx-auto text-center text-white lg:w-3/4 xl:w-2/3">
            <h1 className="mb-20 text-3xl font-semibold sm:text-5xl md:text-7xl">{post.title}</h1>
          </div>
        </article>

        <div className="max-w-5xl mx-auto">
          <Image
            // eslint-disable-next-line
            // @ts-ignore
            image={post.coverImage}
            maxWidth={400}
            outerWrapperClassName="rounded-2xl shadow-xl overflow-hidden"
            alt={post.title}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center my-8">
            <div className="flex items-center space-x-4 divide-x-2 divide-white">
              <NextImage
                src="/me.jpg"
                width={75}
                height={75}
                className="rounded-full"
                alt="Daniel Esteves"
              />

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
                    <Icons.FaTwitter className="text-3xl text-white" />
                  </span>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title} por @danestves&summary=&source=`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="sr-only">Share on Linkedin</p>
                  <span className="grid w-12 h-12 p-1 m-2 transition-all duration-200 transform rounded cursor-pointer place-items-center">
                    <Icons.FaLinkedinIn className="text-3xl text-white" />
                  </span>
                </a>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${window.location.href}&media=undefined&description=${post.title} por @danestves`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="sr-only">Share on Pinterest</p>
                  <span className="grid w-12 h-12 p-1 m-2 transition-all duration-200 transform rounded cursor-pointer place-items-center">
                    <Icons.FaPinterestP className="text-3xl text-white" />
                  </span>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="sr-only">Share on Facebook</p>
                  <span className="grid w-12 h-12 p-1 m-2 transition-all duration-200 transform rounded cursor-pointer place-items-center">
                    <Icons.FaFacebookF className="text-3xl text-white" />
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
  const apollo = getApolloClient()
  const { data } = await apollo.query({
    query: GET_POST_SLUGS,
    variables: {
      first: 100,
    },
  })

  const paths = data?.posts.map((post: Post) => {
    return {
      params: { slug: post.slug },
    }
  })

  return {
    paths: paths || [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const apollo = getApolloClient()
  const { data } = await apollo.query({
    query: GET_POST,
    variables: {
      slug: params?.slug,
    },
  })

  return {
    props: {
      preview,
      post: data.post,
    },
  }
}

export default BlogPage
