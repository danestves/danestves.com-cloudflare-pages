// Dependencies
import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import ErrorPage from 'next/error'
import Image from 'next/image'
import { DiscussionEmbed } from 'disqus-react'
import { FaFacebookSquare, FaTwitter, FaWhatsapp, FaLinkedin, FaShareAlt } from 'react-icons/fa'
import { BsLink45Deg } from 'react-icons/bs'
import { Transition } from '@tailwindui/react'
import { window } from 'browser-monads'
import cogoToast from 'cogo-toast'

// Components
import { SEO, Emoji, Link, Newsletter, CallToAction } from '@/components'
import Markdown from '@/components/Markdown'

// Interfaces
import { Blog, Media } from '@/interfaces'

// Utils
import { getStrapiURL, getBlogData } from '@/utils/api'
import removeMarkdown from '@/utils/removeMarkdown'
import readingTime from '@/utils/readingTime'

type DynamicBlogProps = {
  blog: Blog | null
}

const DynamicBlog: React.FC<DynamicBlogProps> = ({ blog }) => {
  // Hooks
  const router = useRouter()

  // States
  const [open, setOpen] = React.useState(false)

  // Methods

  /**
   * @function webShareAPI
   *
   * @description
   * Share the current post using Web Share API
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
   */
  const webShareAPI = async (): Promise<void> => {
    if (navigator.share) {
      return navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .then(() => console.log(`Thanks for sharing!`))
        .catch((error: string) => console.log(`Error sharing: `, error))
    } else {
      setOpen(true)
    }
  }

  /**
   * @function copyLink
   *
   * @description
   * Copy the text inside the input
   */
  const copyLink = async (): Promise<void> => {
    const copyText = document.getElementById(`url`) as HTMLInputElement

    try {
      copyText.select()

      await navigator.clipboard.writeText(copyText.value)

      cogoToast.success('Copiado exitosamente 👍 🙂')
    } catch (err) {
      console.error(`Failed to copy: `, err)
    }
  }

  // Render

  /**
   * Check if the required data was provided
   */
  if ((!router.isFallback && !blog) || !blog) {
    return <ErrorPage statusCode={404} />
  }

  /**
   * Load content of the blog when data exist
   */
  const { cover } = blog
  const shareMedia = [{ url: '', width: 1200, height: 630 }] as unknown
  const disqusConfig = {
    url: `https://danestves.com/blog/${blog.slug}`,
    identifier: blog.id,
    title: blog.title,
  }

  return (
    <>
      <SEO
        title={blog.title}
        description={`${removeMarkdown(blog.body).substr(0, 155).trimEnd()}...`}
        shareImage={shareMedia as Media}
      />

      <div className="relative -mt-20 h-80" style={{ zIndex: -1 }}>
        <Image
          src={cover.url || cover.formats.large?.url || '/'}
          alt={blog.title}
          objectFit="cover"
          layout="fill"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
      </div>

      <div className="container max-w-screen-xl px-5 mt-5 mb-6">
        <h1 className="text-3xl font-bold text-center text-white md:text-5xl">{blog.title}</h1>

        <div className="flex flex-wrap items-center justify-center mt-2 space-x-8">
          <div>
            <p className="font-mono text-blue-400">
              <Emoji emoji="⏱" className="mr-2 text-2xl" />
              {readingTime(blog.body)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center space-x-2 md:justify-start">
            {blog.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.name}`}
                className="font-mono text-blue-400 transition-all duration-100 hover:text-white"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container px-5 mb-10">
        <div className="relative w-full">
          <div className="relative z-20 w-64 mx-auto bg-secondary">
            <img
              src="/me.jpg"
              alt="Daniel Esteves"
              className="z-30 w-48 h-48 mx-auto border-white rounded-full border-10"
            />
          </div>
          <hr className="absolute z-10 w-full transform -translate-y-1/2 top-1/2 border-primary" />
        </div>

        <h2 className="mt-4 font-mono text-center text-primary">
          Daniel Esteves - Progamador Web Fullstack
        </h2>
      </div>

      <div className="container px-5">
        <div className="flex flex-wrap lg:space-x-12">
          <div className="w-full xl:w-2/3">
            <Markdown markdown={blog.body} />
          </div>

          <div className="w-full mt-10 lg:mt-0 xl:flex-1">
            <Newsletter />
          </div>
        </div>
      </div>

      <div className="container px-5 py-16 my-10 border-t-2 border-b-2 border-primary">
        <DiscussionEmbed shortname="danestves" config={disqusConfig} />
      </div>

      <CallToAction />

      <button
        onClick={webShareAPI}
        className="fixed bottom-0 right-0 p-4 mb-4 mr-4 transition-all rounded-full focus:outline-none bg-primary"
      >
        <FaShareAlt className="w-6 h-6 fill-current text-secondary" />
      </button>

      <Transition
        show={open}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        onClick={() => setOpen(false)}
        className="z-100"
      >
        <div className="fixed inset-0 transition-opacity z-100">
          <div className="absolute inset-0 bg-opacity-50 bg-secondary"></div>
        </div>
      </Transition>

      <Transition
        show={open}
        enter="ease-out duration-500"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="fixed inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 bg-opacity-50 rounded-lg shadow-xl backdrop-blur top-1/2 left-1/2 z-100 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <p className="mb-4 font-mono text-lg text-white">Compártelo en:</p>

        <div className="flex flex-wrap items-center">
          <div className="w-full px-1">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 rounded shadow bg-secondary text-primary"
                >
                  <FaFacebookSquare className="w-6 h-6 mx-auto fill-current" />
                </a>
              </div>
              <div>
                <a
                  href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}&via=danestves`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 rounded shadow bg-secondary text-primary"
                >
                  <FaTwitter className="w-6 h-6 mx-auto fill-current" />
                </a>
              </div>
              <div>
                <a
                  href={`https://api.whatsapp.com/send?text=*${blog.title} | @danestves* ${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 rounded shadow bg-secondary text-primary"
                >
                  <FaWhatsapp className="w-6 h-6 mx-auto fill-current" />
                </a>
              </div>
              <div>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 rounded shadow bg-secondary text-primary"
                >
                  <FaLinkedin className="w-6 h-6 mx-auto fill-current" />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full px-1 mt-6">
            <p className="mb-4 font-mono text-lg text-white">O copia el enlace:</p>

            <textarea
              className="block w-full px-4 py-2 text-sm leading-normal text-gray-500 bg-white border border-gray-300 rounded-lg appearance-none"
              id="url"
              disabled
            >
              {window.location.href}
            </textarea>

            <button
              className="flex items-center justify-center w-full py-1 mt-3 transition-all duration-100 border rounded bg-primary focus:outline-none text-secondary hover:bg-secondary hover:text-primary border-secondary hover:border-primary"
              onClick={copyLink}
            >
              Copiar enlace <BsLink45Deg className="w-6 h-6 ml-1 fill-current" />
            </button>
          </div>
        </div>
      </Transition>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await (await fetch(getStrapiURL('/blogs'))).json()
  const paths = blogs.map((blog: Blog) => {
    const slugArray = blog.slug.split('__')

    return {
      params: { slug: slugArray },
    }
  })

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let chainedSlugs

  if (params == {} || !params?.slug) {
    chainedSlugs = ``
  } else {
    const slugs = params.slug as string[]

    chainedSlugs = slugs.join('__')
  }

  const blogData = await getBlogData(chainedSlugs)

  if (blogData == null) {
    return { props: {} }
  }

  const data = blogData

  return {
    props: {
      blog: data,
    },
  }
}

export default DynamicBlog
