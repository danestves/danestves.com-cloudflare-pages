// Dependencies
import * as React from 'react'
import Image from 'next/image'
import { ArticleJsonLd } from 'next-seo'
import { window } from 'browser-monads'

// Components
import { SEO, ViewsCounter, Subscribe } from '@/components'

// Interfaces
import { FrontMatterPost } from '@/interfaces'

// Utils
import { formatDate, readingTime } from '@/utils'

const editUrl = (slug: string): string => {
  return `https://github.com/danestves/website/edit/master/src/data/blog/${slug}.mdx`
}
const discussUrl = (slug: string): string => {
  return `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://danestves.com/blog/${slug}`
  )}`
}

interface Props {
  frontMatter: FrontMatterPost
  children: React.ReactNode
}

export default function BlogLayout({ frontMatter, children }: Props): JSX.Element {
  return (
    <>
      <SEO
        title={frontMatter.seotitle}
        description={frontMatter.summary}
        shareImage={`https://danestves.com${frontMatter.image}`}
        openGraph={{
          images: [
            {
              url: `https://danestves.com${frontMatter.image}`,
              width: 1200,
              height: 630,
              alt: frontMatter.seotitle,
            },
          ],
          type: 'article',
        }}
        additionalMetaTags={[
          {
            name: 'twitter:image',
            content: `https://danestves.com${frontMatter.image}`,
          },
        ]}
      />
      <ArticleJsonLd
        url={window.location.href}
        title={frontMatter.seotitle}
        images={[`https://danestves.com${frontMatter.image}`]}
        datePublished={frontMatter.publishedAt}
        dateModified={frontMatter.publishedAt}
        authorName={['Daniel Esteves']}
        publisherName="Daniel Esteves"
        publisherLogo="https://danestves.com/logo.png"
        description={frontMatter.summary}
      />

      <article className="container px-5 py-16">
        <div className="container">
          <div className="mx-auto text-center text-white lg:w-3/4 xl:w-2/3">
            <h1 className="mb-20 text-3xl font-semibold sm:text-5xl md:text-7xl">
              {frontMatter.title}
            </h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <Image
            src={frontMatter.image}
            alt={frontMatter.title}
            width={1024}
            height={683}
            className="overflow-hidden shadow-xl rounded-2xl"
            layout="responsive"
            quality={100}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center my-8">
            <div className="flex items-center space-x-4 divide-x-2 divide-white">
              <Image
                src="/me.jpg"
                width={75}
                height={75}
                className="rounded-full"
                alt="Daniel Esteves"
              />

              <div className="pl-4">
                <h2 className="text-lg font-semibold text-white">Daniel Esteves</h2>
                <p className="text-white capitalize">
                  {formatDate(frontMatter.publishedAt, 'MMMM d, yyyy')}
                </p>
                <p className="text-white">{readingTime({ wordCount: frontMatter.wordCount })}</p>
                <p className="text-white">
                  <ViewsCounter slug={frontMatter.slug} />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="max-w-full prose prose-lg">{children}</div>

          <Subscribe />

          <div className="flex items-center justify-start mt-6 space-x-3">
            <a
              href={editUrl(frontMatter.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              Editar en GitHub
            </a>
            <a
              href={discussUrl(frontMatter.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              Comentar en Twitter
            </a>
          </div>
        </div>
      </article>
    </>
  )
}
