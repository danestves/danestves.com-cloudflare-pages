// Dependencies
import * as React from 'react';
import { graphql } from 'gatsby';

// Components
import { SEO, BlogCard, NewsletterForm, CallToAction } from '../components';

// Types
import { IBlogCard } from '../types';

type Props = {
  data: {
    allStrapiBlogs: {
      nodes: [IBlogCard];
    };
  };
};

const Blog: React.FC<Props> = ({
  data: {
    allStrapiBlogs: { nodes: blogs },
  },
}) => (
  <>
    <SEO
      isTemplate
      title="Blog"
      description="Blog de Daniel Esteves para dar a conocer a la comunidad información sobre frameworks, snippets de código y enseñanzas que ha aprendido con el tiempo."
    />

    {/* Space for Header */}
    <div className="w-full min-h-20 bg-secondary"></div>

    <div className="w-full px-5 py-12 bg-secondary">
      <ul className="max-w-4xl mx-auto space-y-12">
        {blogs && blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
      </ul>
    </div>

    <NewsletterForm />

    <CallToAction />
  </>
);

export const query = graphql`
  query Blogs {
    allStrapiBlogs(sort: { fields: [createdAt], order: [DESC] }) {
      nodes {
        id
        slug
        tags {
          id
          name
        }
        title
        createdAt(formatString: "MMM DD YYYY", locale: "es")
        body
      }
    }
  }
`;

export default Blog;
