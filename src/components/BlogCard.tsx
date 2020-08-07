// Dependencies
import * as React from 'react';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import removeMarkdown from '@qwilapp/remove-markdown';

type Tags = {
  id: string;
  name: string;
};

type BlogCardProps = {
  blog: {
    id: string;
    slug: string;
    title: string;
    ogCover: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    tags: [Tags];
    body: string;
    createdAt: string;
  };
  home: {
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, home }) => {
  // Methods
  const readingTime = (text: string) => {
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);

    return readTime === 1 ? `${readTime} minuto de lectura` : `${readTime} minutos de lectura`;
  };

  // Render
  return (
    <div key={blog.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <Link to={`/blog/${blog.slug}`} className="block" title={blog.title}>
          <Img fluid={blog.ogCover.childImageSharp.fluid} className="object-cover w-full" alt={blog.title} />
        </Link>
      </div>
      <div className="flex flex-col justify-between flex-1 p-6 transition-all duration-200 bg-white dark:bg-gray-700">
        <div className="flex-1">
          <p className="text-sm font-medium leading-5 text-indigo-600 transition-all duration-200 dark:text-indigo-400">
            {blog.tags &&
              blog.tags.map(tag => (
                <Link
                  key={tag.id}
                  to={`/tags/${tag.name}`}
                  className="mx-2 first:ml-0 last:mr-0"
                  title={`#${tag.name}`}
                >
                  #{tag.name}
                </Link>
              ))}
          </p>
          <Link to={`/blog/${blog.slug}`} className="block">
            <h3
              className="mt-2 text-xl font-semibold leading-7 text-gray-900 transition-all duration-200 dark:text-gray-300"
              title={blog.title}
            >
              {blog.title}
            </h3>
            <p
              className="mt-3 leading-6 text-gray-900 text-opacity-75 dark:text-gray-500"
              title={`${removeMarkdown(blog.body.substr(0, 154))}...`}
            >
              {removeMarkdown(blog.body.substr(0, 154))}
              ...
            </p>
          </Link>
        </div>
        <div className="flex items-center mt-6">
          <div className="flex-shrink-0">
            <a
              href="https://twitter.com/@danestves"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <Img alt="Daniel Esteves" className="w-10 h-10 rounded-full" fluid={home.image.childImageSharp.fluid} />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium leading-5 text-gray-900">
              <a
                href="https://twitter.com/@danestves"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-semibold hover:underline dark:text-gray-300"
              >
                Daniel Esteves
              </a>
            </p>
            <div className="flex text-sm leading-5 text-gray-600 dark:text-gray-500">
              <time dateTime={blog.createdAt}>{blog.createdAt}</time>
              <span className="mx-1">&middot;</span>
              <span>{readingTime(blog.body)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
