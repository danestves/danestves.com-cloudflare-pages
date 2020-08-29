// Dependencies
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Markdown from 'react-markdown';
import { useTransition, animated, config } from 'react-spring';
import { window } from 'browser-monads';
import { Disqus } from 'gatsby-plugin-disqus';
import removeMarkdown from 'remove-markdown';

// Components
import { SEO, NewsletterForm, Emoji, CallToAction, CodeBlock } from '../components';

// Icons
import { ShareIcon, FacebookIcon, TwitterIcon, WhatsAppIcon, LinkedInIcon, LinkIcon } from '../icons';

// Interfaces
import { ISingleBlog } from '../types';

type Props = {
  data: {
    strapiBlogs: ISingleBlog;
  };
};

const markdownRenderers = {
  code: CodeBlock,
};

const Blog: React.FC<Props> = ({ data: { strapiBlogs: blog } }) => {
  // States
  const [modal, setModal] = React.useState(false);

  const modalTransition = useTransition(modal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.wobbly,
  });
  const modalOverlayTransition = useTransition(modal, null, {
    from: { opacity: 0 },
    enter: { opacity: 0.5 },
    leave: { opacity: 0 },
    config: config.wobbly,
  });

  // Methods
  const readingTime = (text: string) => {
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return readTime === 1 ? `${readTime} minuto de lectura` : `${readTime} minutos de lectura`;
  };

  const webShareAPI = () => {
    if (window.navigator.share) {
      window.navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .then(() => console.log(`Thanks for sharing!`))
        .catch((error: string) => console.log(`Error sharing: `, error));
    } else {
      setModal(true);
    }
  };

  const copyLink = async () => {
    const copyText = document.getElementById(`url`) as HTMLInputElement;

    try {
      await navigator.clipboard.writeText(copyText.value);
    } catch (err) {
      console.error(`Failed to copy: `, err);
    }
  };

  const disqusConfig = {
    url: `https://danestves.com/blog/${blog.slug}`,
    identifier: blog.id,
    title: blog.title,
  };

  const jsonLd = {
    '@context': `https://schema.org/`,
    '@type': `Article`,
    author: {
      '@type': `Person`,
      name: `Daniel Esteves`,
      image: `Profile`,
      sameAs: [`https://danestves.com`, `https://twitter.com/danestves`],
    },
    keywords: blog.tags.length ? blog.tags.map(tag => `${tag.name}`) : undefined,
    headline: `${blog.title.length > 50 ? `${blog.title.substr(0, 53)}...` : blog.title} | @danestves`,
    url: window.location.href,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    image: {
      '@type': `ImageObject`,
      url: blog.ogCover.publicURL,
      width: 1200,
      height: 628,
    },
    publisher: {
      '@type': `Organization`,
      name: `Daniel Esteves`,
      logo: {
        '@type': `ImageObject`,
        url: `Logo`,
        width: 60,
        height: 60,
      },
    },
    description: `${removeMarkdown(blog.body).substr(0, 157)}...`,
    mainEntityOfPage: {
      '@type': `WebPage`,
      '@id': `https://danestves.com`,
    },
  };

  // Render
  return (
    <>
      <SEO
        title={blog.title}
        description={`${removeMarkdown(blog.body).substr(0, 157)}...`}
        jsonLdProps={jsonLd}
        meta={[
          {
            name: `keywords`,
            content: `${blog.tags.map(tag => `${tag.name}`)}`,
          },
          {
            name: `language`,
            content: `ES`,
          },
          {
            name: `url`,
            content: window.location.href,
          },
          {
            name: `date`,
            content: blog.createdAt,
          },
          {
            property: `og:type`,
            content: `article`,
          },
          {
            name: `twitter:image`,
            content: `https://danestves.com${blog.ogCover.publicURL}`,
            key: `twitter:image`,
          },
          {
            name: `twitter:image:alt`,
            content: blog.title,
          },
        ]}
      />

      <Helmet>
        <meta property="og:image" content={blog.ogCover.publicURL} />
        {blog.tags && blog.tags.map((keyword, i) => <meta property="article:tag" content={keyword.name} key={i} />)}
        <meta property="article:published_time" content={blog.createdAt} />
        <meta property="article:modified_time" content={blog.updatedAt} />
        <meta property="article:author" content="https://facebook.com/danestves" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Daniel Esteves" />
        {blog.tags && <meta name="twitter:label2" content="Filed under" />}
        {blog.tags && <meta name="twitter:data2" content={blog.tags[0].name} />}
      </Helmet>

      <div className="relative overflow-hidden rounded shadow-lg">
        <Img fluid={blog.cover.childImageSharp.fluid} />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
      </div>

      <div className="container px-5 mt-5 mb-6">
        <h1 className="text-3xl font-bold text-center text-white md:text-5xl">{blog.title}</h1>

        <div className="flex flex-wrap items-center justify-center space-x-8">
          <div>
            <p className="font-mono text-blue">
              <Emoji className="mr-2 text-2xl">⏱</Emoji>
              {readingTime(blog.body)}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {blog.tags.map(tag => (
              <Link key={tag.id} to={`/tags/${tag.name}`} className="font-mono text-blue">
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
              src="/me.jpeg"
              alt="Daniel Esteves"
              className="z-30 w-48 h-48 mx-auto border-white rounded-full border-10"
            />
          </div>
          <hr className="absolute top-0 z-10 w-full transform -translate-y-1/2 top-1/2 border-primary" />
        </div>

        <h2 className="mt-4 font-mono text-center text-primary">Daniel Esteves - Progamador Web Fullstack</h2>
      </div>

      <div className="container px-5">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 xl:w-3/4">
            <Markdown
              className="prose prose-lg text-white"
              source={blog.body}
              renderers={markdownRenderers}
              escapeHtml={false}
            />
          </div>

          <div className="w-full mt-10 lg:mt-0 lg:w-1/2 xl:w-1/4">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="container px-5 py-16 my-10 border-t-2 border-b-2 border-primary">
        <Disqus config={disqusConfig} />
      </div>

      <CallToAction />

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
              tabIndex={-1}
            />
          ),
      )}

      {modalTransition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={{
                top: `50%`,
                left: `50%`,
                transform: `translate(-50%, -50%)`,
                ...props,
              }}
              className="fixed z-10 w-full"
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
                      className="flex items-center justify-center w-full py-1 mt-3 uppercase border border-gray-500 rounded"
                      onClick={copyLink}
                    >
                      copiar enlace <LinkIcon className="w-6 h-6 ml-3 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            </animated.div>
          ),
      )}
    </>
  );
};

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
`;

export default Blog;
