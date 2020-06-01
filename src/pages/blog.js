// Dependencies
import React from 'react';
import { graphql } from 'gatsby';

// Components
import { SEO, Layout, BlogCard } from '../components';

export default ({
  data: {
    allStrapiBlogs: { nodes: blogs },
    strapiHome: home
  }
}) => (
  <Layout>
    <SEO
      isTemplate
      title="Blog"
      description="Blog de Daniel Esteves para dar a conocer a la comunidad información sobre frameworks, snippets de código y enseñanzas que ha aprendido con el tiempo."
    />

    <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
      {blogs &&
        blogs.map(blog => <BlogCard key={blog.id} blog={blog} home={home} />)}
    </div>
  </Layout>
);

export const query = graphql`
  query Blogs {
    allStrapiBlogs(sort: { fields: [createdAt], order: [DESC] }) {
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
        createdAt(formatString: "MMM DD YYYY", locale: "es")
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
