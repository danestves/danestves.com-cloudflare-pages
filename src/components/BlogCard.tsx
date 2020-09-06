// Dependencies
import * as React from 'react';
import { Link } from 'gatsby';
import removeMarkdown from 'remove-markdown';

// Components
import { Emoji } from '../components';

// Types
import { IBlogCard } from '../types';

type BlogCardProps = {
  blog: IBlogCard;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
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
    <div key={blog.id} className="flex flex-wrap w-full overflow-hidden rounded-lg shadow-lg">
      <div className="w-full lg:w-1/2">
        <Link to={`/blog/${blog.slug}`} className="block h-full" title={blog.title}>
          <img
            src={`https://opengraphimg.com/opengraph?title=${decodeURIComponent(
              decodeURIComponent(blog.title),
            )}&tags=${blog.tags
              ?.map(({ name }) => name)
              .join(
                `,`,
              )}&author=danestves&background=00C389FF&boxBackground=071D49FF&titleMargin=-mt-12&tagsSize=text-3xl&atSymbol=true&authorSize=text-3xl`}
            className="object-contain w-full h-full"
            alt={blog.title}
          />
        </Link>
      </div>

      <div className="flex flex-col justify-between w-full p-6 transition-all duration-200 bg-white lg:w-1/2">
        <div className="flex-1">
          <p className="text-sm font-medium leading-5 transition-all duration-200 text-blue">
            {blog.tags?.map(tag => (
              <Link key={tag.id} to={`/tags/${tag.name}`} className="mx-2 first:ml-0 last:mr-0" title={`#${tag.name}`}>
                #{tag.name}
              </Link>
            ))}
          </p>
          <Link to={`/blog/${blog.slug}`} className="block">
            <h3
              className="mt-2 text-xl font-semibold leading-7 text-gray-900 transition-all duration-200"
              title={blog.title}
            >
              {blog.title}
            </h3>
            <p
              className="mt-3 leading-6 text-gray-500 text-opacity-75"
              title={`${removeMarkdown(blog.body.substr(0, 77))}...`}
            >
              {removeMarkdown(blog.body.substr(0, 77))}
              ...
            </p>
          </Link>
        </div>

        <div className="grid items-center grid-cols-2 mt-3">
          <div>
            <p className="text-center">
              <Emoji>📅</Emoji>
              <time className="ml-1 text-sm text-blue" dateTime={blog.createdAt}>
                {blog.createdAt}
              </time>
            </p>
          </div>
          <div>
            <p className="text-sm text-center text-blue">
              <Emoji>⏱</Emoji> {readingTime(blog.body)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
