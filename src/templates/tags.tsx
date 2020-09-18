// Dependencies
import * as React from 'react';
import { graphql } from 'gatsby';
import { window } from 'browser-monads';

// Components
import { BlogCard, SEO } from '../components';

// Interfaces
import { IBlogCard } from '../types';

type Props = {
  data: {
    allStrapiBlogs: {
      nodes: [IBlogCard];
    };
  };
  pageContext: {
    name: string;
  };
};

const Tags: React.FC<Props> = ({
  data: {
    allStrapiBlogs: { nodes: blogs },
  },
  pageContext: { name },
}) => (
  <>
    <SEO
      title={`Artículos sobre #${name}`}
      meta={[
        {
          name: `language`,
          content: `ES`,
        },
        {
          name: `url`,
          content: window.location.href,
        },
      ]}
    />

    {/* Space for Header */}
    <div className="w-full min-h-20 bg-secondary"></div>

    <div className="min-h-screen">
      <h1 className="w-full px-5 mt-4 mb-8 text-xl font-bold leading-none text-center text-white sm:text-2xl md:text-4xl lg:text-5xl">
        #{name}
      </h1>

      <ul className="max-w-4xl mx-auto space-y-12">
        {blogs && blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
      </ul>
    </div>
  </>
);

export const query = graphql`
  query BlogsByTag($name: String!) {
    allStrapiBlogs(sort: { fields: createdAt, order: DESC }, filter: { tags: { elemMatch: { name: { eq: $name } } } }) {
      nodes {
        id
        slug
        tags {
          id
          name
        }
        title
        createdAt(formatString: "ddd MM YYYY", locale: "es")
        body
      }
    }
  }
`;

export default Tags;
