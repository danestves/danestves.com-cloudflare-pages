// Dependencies
import React from 'react';
import { graphql, Link } from 'gatsby';

// Components
import { Layout, SEO } from '../components';

export default ({
  data: {
    allStrapiTags: { nodes: tags }
  }
}) => (
  <Layout>
    <SEO
      title="Tags"
      meta={[
        {
          name: 'keywords',
          content: `${tags.map(tag => `${tag.name}`)}`
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

    <div className="mt-12">
      <div className="flex flex-wrap justify-center">
        {tags &&
          tags.map(tag => (
            <Link
              key={tag.id}
              to={`/tags/${tag.name}`}
              className="px-3 py-1 mx-1 text-lg leading-none transition-all duration-200 border-2 border-gray-700 rounded-full hover:border-indigo-700"
            >
              {tag.name}
            </Link>
          ))}
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  query Tags {
    allStrapiTags {
      nodes {
        id
        name
      }
    }
  }
`;
