// Dependencies
import React, { useState } from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Markdown from "react-markdown"
import { useTransition, animated, config } from "react-spring"
import { window } from "browser-monads"
import removeMD from "remove-markdown"
import { Disqus } from "gatsby-plugin-disqus"

// Components
import {
  CodeBlock,
  Paragraph,
  InlineCode,
  MarkdownImage,
  MarkdownLink,
  Heading,
  SEO,
  Layout,
} from "../components"

// Icons
import {
  ShareIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsAppIcon,
  LinkedInIcon,
  LinkIcon,
} from "../icons"

// Images
import Logo from "../images/logo.png"
import Profile from "../images/profile.jpg"

const markdownRenderers = {
  code: CodeBlock,
  paragraph: Paragraph,
  inlineCode: InlineCode,
  image: MarkdownImage,
  link: MarkdownLink,
  heading: Heading,
}

export default ({ data }) => {
  // States
  const [modal, setModal] = useState(false)
  const blog = data.strapiBlogs

  const modalTransition = useTransition(modal, null, {
    from: { opacity: 0, transform: `scale(${0})` },
    enter: { opacity: 1, transform: `scale(${1})` },
    leave: { opacity: 0, transform: `scale(${0})` },
    config: config.wobbly,
  })
  const modalOverlayTransition = useTransition(modal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.wobbly,
  })

  // Functions
  const readingTime = text => {
    const wordsPerMinute = 200
    const noOfWords = text.split(/\s/g).length
    const minutes = noOfWords / wordsPerMinute
    const readTime = Math.ceil(minutes)
    return readTime === 1
      ? `${readTime} minuto de lectura`
      : `${readTime} minutos de lectura`
  }

  const webShareAPI = () => {
    if (window.navigator.share) {
      window.navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .then(() => console.log("Thanks for sharing!"))
        .catch(error => console.log("Error sharing: ", error))
    } else {
      setModal(true)
    }
  }

  const copyLink = async () => {
    const copyText = document.getElementById("url")

    try {
      await navigator.clipboard.writeText(copyText.value)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const disqusConfig = {
    url: `https://danestves.com/blog/${blog.slug}`,
    identifier: blog.id,
    title: blog.title,
  }

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": `Article`,
    author: {
      "@type": `Person`,
      name: `Daniel Esteves`,
      image: Profile,
      sameAs: ["https://danestves.com", "https://twitter.com/danestves"],
    },
    keywords: blog.tags.length
      ? blog.tags.map(tag => `${tag.name}`)
      : undefined,
    headline: `${
      blog.title.length > 50 ? `${blog.title.substr(0, 53)}...` : blog.title
    } | @danestves`,
    url: window.location.href,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    image: {
      "@type": `ImageObject`,
      url: blog.ogCover.publicURL,
      width: 1200,
      height: 628,
    },
    publisher: {
      "@type": `Organization`,
      name: `Daniel Esteves`,
      logo: {
        "@type": `ImageObject`,
        url: Logo,
        width: 60,
        height: 60,
      },
    },
    description: `${removeMD(blog.body).substr(0, 157)}...`,
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": `https://danestves.com`,
    },
  }

  // Render
  return (
    <Layout>
      <SEO
        title={blog.title}
        description={`${removeMD(blog.body).substr(0, 157)}...`}
        jsonLdProps={jsonLd}
        meta={[
          {
            name: "keywords",
            content: `${blog.tags.map(tag => `${tag.name}`)}`,
          },
          {
            name: "language",
            content: "ES",
          },
          {
            name: "url",
            content: window.location.href,
          },
          {
            name: "date",
            content: blog.createdAt,
            schema: "YYYY-MM-DD",
          },
          {
            property: "og:type",
            content: "article",
          },
          {
            name: "twitter:image",
            content: `https://danestves.com${blog.ogCover.publicURL}`,
            key: "twitter:image",
          },
          {
            name: "twitter:image:alt",
            content: blog.title,
          },
        ]}
      />
      <Helmet>
        <meta property="og:image" content={blog.ogCover.publicURL} />
        {blog.tags &&
          blog.tags.map((keyword, i) => (
            <meta property="article:tag" content={keyword.name} key={i} />
          ))}
        <meta property="article:published_time" content={blog.createdAt} />
        <meta property="article:modified_time" content={blog.updatedAt} />
        <meta
          property="article:author"
          content="https://facebook.com/danestves"
        />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Daniel Esteves" />
        {blog.tags && <meta name="twitter:label2" content="Filed under" />}
        {blog.tags && <meta name="twitter:data2" content={blog.tags[0].name} />}
      </Helmet>

      <div className="relative overflow-hidden rounded shadow-lg dark:shadow-white-lg">
        <Img fluid={blog.cover.childImageSharp.fluid} />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
        <h1 className="absolute w-full px-5 text-xl font-bold leading-none text-center text-white sm:text-2xl md:text-4xl lg:text-5xl top-1/2 translate-y-n-1/2">
          {blog.title}
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center py-5 sm:justify-between">
        <div className="flex flex-wrap items-center">
          <svg
            width={542.183}
            height={542.183}
            viewBox="0 0 512 604"
            className="w-12 h-12 mr-1 text-indigo-700 fill-current"
          >
            <path d="M432.544 310.636c0-9.897-3.521-18.559-10.564-25.984L217.844 80.8c-7.232-7.238-16.939-13.374-29.121-18.416-12.181-5.043-23.319-7.565-33.407-7.565H36.545c-9.896 0-18.464 3.619-25.694 10.848C3.616 72.9 0 81.466 0 91.365v118.771c0 10.088 2.519 21.219 7.564 33.404 5.046 12.185 11.187 21.792 18.417 28.837L230.12 476.799c7.043 7.043 15.608 10.564 25.694 10.564 9.898 0 18.562-3.521 25.984-10.564l140.186-140.47c7.039-7.045 10.56-15.604 10.56-25.693zM117.204 172.02c-7.139 7.138-15.752 10.709-25.841 10.709-10.085 0-18.698-3.571-25.837-10.709-7.139-7.139-10.705-15.749-10.705-25.837 0-10.089 3.566-18.702 10.705-25.837 7.139-7.139 15.752-10.71 25.837-10.71 10.089 0 18.702 3.571 25.841 10.71 7.135 7.135 10.707 15.749 10.707 25.837-.001 10.088-3.572 18.698-10.707 25.837z" />
            <path d="M531.612 284.655L327.473 80.804c-7.23-7.238-16.939-13.374-29.122-18.417-12.177-5.042-23.313-7.564-33.402-7.564h-63.953c10.088 0 21.222 2.522 33.402 7.564 12.185 5.046 21.892 11.182 29.125 18.417L467.66 284.655c7.046 7.423 10.571 16.084 10.571 25.981 0 10.089-3.525 18.647-10.571 25.693l-134.191 134.19c5.718 5.9 10.759 10.182 15.133 12.847 4.38 2.666 9.996 3.998 16.844 3.998 9.903 0 18.565-3.521 25.98-10.564l140.186-140.47c7.046-7.046 10.571-15.604 10.571-25.693-.004-9.898-3.525-18.559-10.571-25.982z" />
          </svg>

          <h2 className="mr-3 text-xl">Tags:</h2>

          {blog.tags.map(item => (
            <div
              key={item.id}
              className="px-3 py-1 mx-1 text-lg leading-none transition-all duration-200 border-2 border-gray-700 rounded-full hover:border-indigo-700"
            >
              {item.name}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center">
          <svg
            width={512}
            height={512}
            viewBox="0 0 512 512"
            className="w-12 h-12 mr-1"
          >
            <path
              fill="#ffbe52"
              d="M45.549 207.323H10V502h446.724V207.323h-35.492z"
            />
            <path fill="#ffd89b" d="M50 453.927h366.78V502H50z" />
            <g fill="#fff">
              <path d="M233.391 489.537c-9-21.566-30.079-35.61-53.448-35.61H50V159.25h129.944c23.368 0 44.448 14.044 53.448 35.61v294.677z" />
              <path d="M416.78 214.742V159.25H286.837c-23.368 0-44.448 14.044-53.448 35.61v294.677c9-21.566 30.079-35.61 53.448-35.61H416.78V214.742z" />
            </g>
            <circle cx={384} cy={128} r={118} fill="#93e7f8" />
            <path d="M135.402 247.598h52.585c5.523 0 10-4.478 10-10s-4.477-10-10-10h-52.585c-5.523 0-10 4.478-10 10s4.477 10 10 10zM95.4 247.6c2.63 0 5.21-1.069 7.07-2.93 1.86-1.86 2.93-4.44 2.93-7.07 0-2.64-1.07-5.21-2.93-7.069-1.86-1.87-4.44-2.931-7.07-2.931s-5.21 1.061-7.07 2.931a10.056 10.056 0 00-2.93 7.069c0 2.63 1.07 5.21 2.93 7.07 1.86 1.86 4.44 2.93 7.07 2.93zm92.587 36.973H95.402c-5.523 0-10 4.478-10 10s4.477 10 10 10h92.585c5.523 0 10-4.478 10-10s-4.477-10-10-10zm0 56.976H95.402c-5.523 0-10 4.478-10 10s4.477 10 10 10h92.585c5.523 0 10-4.478 10-10s-4.477-10-10-10zm10 66.975c0-5.522-4.477-10-10-10H95.402c-5.523 0-10 4.478-10 10s4.477 10 10 10h92.585c5.523 0 10-4.477 10-10zm173.394-123.951h-92.585c-5.523 0-10 4.478-10 10s4.477 10 10 10h92.585c5.523 0 10-4.478 10-10s-4.477-10-10-10zm0 56.976h-92.585c-5.523 0-10 4.478-10 10s4.477 10 10 10h92.585c5.523 0 10-4.478 10-10s-4.477-10-10-10zm0 56.975h-92.585c-5.523 0-10 4.478-10 10s4.477 10 10 10h92.585c5.523 0 10-4.478 10-10s-4.477-10-10-10zM358.47 492c-2.63 0-5.21 1.069-7.07 2.93s-2.93 4.44-2.93 7.07 1.07 5.21 2.93 7.069a10.077 10.077 0 007.07 2.931c2.63 0 5.21-1.07 7.07-2.931 1.86-1.859 2.93-4.439 2.93-7.069s-1.07-5.21-2.93-7.07a10.071 10.071 0 00-7.07-2.93z" />
            <path d="M512 128C512 57.421 454.58 0 384 0S256 57.421 256 128c0 9.35 1.017 18.465 2.93 27.25a67.782 67.782 0 00-25.535 19.997c-12.658-16.184-32.188-25.997-53.451-25.997H50c-5.523 0-10 4.478-10 10v38.073H10c-5.523 0-10 4.478-10 10V502c0 5.522 4.477 10 10 10h308.469c5.523 0 10-4.478 10-10s-4.477-10-10-10h-75.242c7.772-17.103 24.723-28.073 43.609-28.073H406.78V492h-8.311c-5.523 0-10 4.478-10 10s4.477 10 10 10h58.254c5.523 0 10-4.478 10-10V225.592C494.402 202.094 512 167.066 512 128zM384 20c59.551 0 108 48.448 108 108 0 48.42-32.029 89.498-76.012 103.164a9.944 9.944 0 00-3.865 1.114A107.75 107.75 0 01384 236c-59.551 0-108-48.448-108-108S324.449 20 384 20zM60 463.927h119.943c18.886 0 35.838 10.97 43.61 28.073H60v-28.073zm0-294.677h119.943c18.751 0 35.599 10.812 43.446 27.705v262.643c-11.937-9.935-27.187-15.671-43.446-15.671H60V169.25zm-40 48.073h20V492H20V217.323zm223.392 242.274V196.956a47.827 47.827 0 0121.402-22.328c8.195 20.878 21.727 39.093 38.904 52.969h-24.903c-5.523 0-10 4.478-10 10s4.477 10 10 10h59.538c.02 0 .039-.003.059-.003C352.567 253.019 367.941 256 384 256c7.773 0 15.386-.698 22.78-2.032v189.959H286.837c-16.26 0-31.509 5.734-43.445 15.67zM446.724 492H426.78V248.639a127.392 127.392 0 0019.943-9.096V492z" />
            <path d="M460.562 138.096h7.263c5.523 0 10-4.478 10-10s-4.477-10-10-10h-7.263c-5.523 0-10 4.478-10 10s4.477 10 10 10zm-143.124-10.192c0-5.522-4.477-10-10-10h-7.263c-5.523 0-10 4.478-10 10s4.477 10 10 10h7.263c5.523 0 10-4.477 10-10zm66.466 66.658c-5.523 0-10 4.478-10 10v7.264c0 5.522 4.477 10 10 10s10-4.478 10-10v-7.264c0-5.523-4.477-10-10-10zM351.977 138H384c5.518 0 9.993-4.47 10-9.987l.096-76.23c.007-5.523-4.465-10.006-9.987-10.013h-.013c-5.517 0-9.993 4.469-10 9.987L374.013 118h-22.036c-5.523 0-10 4.478-10 10s4.477 10 10 10z" />
          </svg>
          <h2 className="text-xl">{readingTime(blog.body)}</h2>
        </div>
      </div>

      <Markdown
        className="markdown-content"
        source={blog.body}
        renderers={markdownRenderers}
        escapeHtml={false}
      />

      <div className="pt-4 mt-8 border-t border-gray-500">
        <Disqus config={disqusConfig} />
      </div>

      <button
        onClick={webShareAPI}
        className="fixed bottom-0 right-0 p-4 mb-4 mr-4 transition-all bg-indigo-700 rounded-full hover:bg-indigo-600 transition-250"
      >
        <ShareIcon className="w-6 h-6 text-white fill-current" />
      </button>

      {modalOverlayTransition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              onClick={() => setModal(false)}
              className="fixed top-0 right-0 w-screen h-screen bg-black opacity-50"
              tabIndex="-1"
            />
          )
      )}

      {modalTransition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="fixed z-10 w-full top-1/2 left-1/2 translate-center"
            >
              <div className="w-full p-4 mx-auto text-left bg-white rounded-lg dark:bg-indigo-900 md:w-1/2">
                <p className="mb-4 text-lg">Compártelo en:</p>

                <div className="flex flex-wrap items-center">
                  <div className="w-1/2 px-1">
                    <div className="flex flex-wrap">
                      <div className="w-1/2 px-1 my-1">
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2 border border-gray-400 rounded shadow"
                        >
                          <FacebookIcon className="w-6 h-6 mx-auto text-indigo-700 fill-current dark:text-white" />
                        </a>
                      </div>
                      <div className="w-1/2 px-1 my-1">
                        <a
                          href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}&via=danestves`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2 border border-gray-400 rounded shadow"
                        >
                          <TwitterIcon className="w-6 h-6 mx-auto text-indigo-700 fill-current dark:text-white" />
                        </a>
                      </div>
                      <div className="w-1/2 px-1 my-1">
                        <a
                          href={`https://api.whatsapp.com/send?text=*${blog.title} | @danestves* ${window.location.href}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2 border border-gray-400 rounded shadow"
                        >
                          <WhatsAppIcon className="w-6 h-6 mx-auto text-indigo-700 fill-current dark:text-white" />
                        </a>
                      </div>
                      <div className="w-1/2 px-1 my-1">
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2 border border-gray-400 rounded shadow"
                        >
                          <LinkedInIcon className="w-6 h-6 mx-auto text-indigo-700 fill-current dark:text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 px-1">
                    <input
                      className="block w-full px-4 py-2 leading-normal bg-white border border-gray-300 rounded-lg appearance-none dark:bg-transparent"
                      id="url"
                      type="url"
                      disabled
                      value={window.location.href}
                    />

                    <button
                      className="flex items-center justify-center block w-full py-1 mt-3 uppercase border border-gray-500 rounded"
                      onClick={copyLink}
                    >
                      copiar enlace{" "}
                      <LinkIcon className="w-6 h-6 ml-3 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            </animated.div>
          )
      )}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    strapiBlogs(slug: { eq: $slug }) {
      id
      slug
      cover {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ogCover {
        publicURL
      }
      title
      tags {
        id
        name
      }
      body
      createdAt(formatString: "YYYY-MM-DD")
      updatedAt(formatString: "YYYY-MM-DD")
    }
  }
`
