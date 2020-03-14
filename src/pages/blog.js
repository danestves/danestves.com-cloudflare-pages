// Dependencies
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { default as Link } from "gatsby-plugin-transition-link"

// Components
import { Fade, SEO, Layout } from "../components"

// Icons
import { ClockIcon } from "../icons"

// Helpers
import removeMarkdown from "../helpers/removeMarkdown"

export default ({
  data: {
    allStrapiBlogs: { nodes: blogs },
  },
}) => (
  <Layout>
    <SEO
      isTemplate
      title="Blog"
      description="Blog de Daniel Esteves para dar a conocer a la comunidad información sobre frameworks, snippets de código y enseñanzas que ha aprendido con el tiempo."
    />

    {blogs
      ? blogs.map(blog => (
          <Fade key={blog.id}>
            <Link
              to={`/blog/${blog.slug}`}
              className="flex flex-wrap items-stretch my-5 overflow-hidden transition-all duration-200 bg-white border border-transparent rounded-lg shadow hover:border-indigo-900 dark:hover:border-white dark:bg-indigo-900 hover:shadow-lg dark:shadow-white dark:hover:shadow-white-lg"
            >
              <Img
                fluid={blog.cover.childImageSharp.fluid}
                className="w-full transition-all duration-200 sm:w-2/5 lg:w-1/3 xl:w-1/5"
              />

              <div className="w-full px-4 py-5 transition-all duration-200 sm:w-3/5 lg:w-2/3 xl:w-4/5">
                <div className="flex flex-col justify-around h-full">
                  <h2 className="my-2 text-2xl leading-none text-center lg:text-3xl xl:text-left">
                    {blog.title}
                  </h2>

                  <span className="flex justify-center mt-2 text-gray-600 xl:justify-start">
                    <ClockIcon className="w-6 h-6 mr-2 fill-current" />{" "}
                    {blog.createdAt}
                  </span>

                  <p className="mt-4 font-light text-gray-500 lg:text-2xl xl:text-xl">
                    {removeMarkdown(blog.body.substr(0, 154))}...
                  </p>
                </div>
              </div>
            </Link>
          </Fade>
        ))
      : ""}
  </Layout>
)

export const query = graphql`
  query Blogs {
    allStrapiBlogs(sort: { fields: [createdAt], order: [DESC] }) {
      nodes {
        id
        slug
        cover {
          childImageSharp {
            fluid(maxWidth: 300, maxHeight: 200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        createdAt(fromNow: true, locale: "es")
        body
      }
    }
  }
`
