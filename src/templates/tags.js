// Dependencies
import React from 'react';
import { graphql } from 'gatsby';
import { window } from 'browser-monads';

// Components
import { Layout, BlogCard, SEO } from '../components';

export default ({
  data: {
    allStrapiBlogs: { nodes: blogs },
    strapiHome: home
  },
  pageContext: { name }
}) => (
  <Layout>
    <SEO
      title={`Blogs: #${name}`}
      meta={[
        {
          name: 'keywords',
          content: name
        },
        {
          name: 'language',
          content: 'ES'
        },
        {
          name: 'url',
          content: window.location.href
        }
      ]}
    />

    <h1 className="w-full px-5 mt-12 text-xl font-bold leading-none text-center text-white sm:text-2xl md:text-4xl lg:text-5xl">
      #{name}
    </h1>

    <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
      {blogs &&
        blogs.map(blog => <BlogCard key={blog.id} blog={blog} home={home} />)}
    </div>
  </Layout>
);

export const query = graphql`
  query BlogsByTag($name: String!) {
    allStrapiBlogs(
      sort: { fields: createdAt, order: DESC }
      filter: { tags: { elemMatch: { name: { eq: $name } } } }
    ) {
      nodes {
        id
        slug
        ogCover {
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 314, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags {
          id
          name
        }
        title
        createdAt(formatString: "ddd MM YYYY", locale: "es")
        body
      }
    }

    strapiHome {
      image {
        childImageSharp {
          fluid(maxWidth: 100, maxHeight: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
