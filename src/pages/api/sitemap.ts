// Dependencies
import { SitemapStream } from 'sitemap'
import { createGzip } from 'zlib'
import type { NextApiRequest, NextApiResponse } from 'next'

// Internals
import { Locale } from '@/generated/graphql'
import { sdk } from '@/lib/graphcms'

const baseURL = 'https://danestves.com'
const flyyerURL = 'https://cdn.flyyer.io/v2/danestves-preview/_/_'
const STATIC_URLS = [
  {
    changefreq: 'monthly',
    img: [
      {
        url: `${flyyerURL}/`,
      },
      {
        url: `${flyyerURL}/es`,
      },
    ],
    links: [
      { lang: 'en', url: `${baseURL}/` },
      { lang: 'es', url: `${baseURL}/es` },
    ],
    url: `${baseURL}/`,
  },
  {
    changefreq: 'monthly',
    img: [
      {
        url: `${flyyerURL}/portfolio`,
      },
      {
        url: `${flyyerURL}/es/portfolio`,
      },
    ],
    links: [
      { lang: 'en', url: `${baseURL}/portfolio` },
      { lang: 'es', url: `${baseURL}/es/portfolio` },
    ],
    url: `${baseURL}/portfolio`,
  },
  {
    changefreq: 'monthly',
    img: [
      {
        url: `${flyyerURL}/posts`,
      },
      {
        url: `${flyyerURL}/es/posts`,
      },
    ],
    links: [
      { lang: 'en', url: `${baseURL}/posts` },
      { lang: 'es', url: `${baseURL}/es/posts` },
    ],
    url: `${baseURL}/posts`,
  },
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Ensure response is XML & gzip encoded
  res.setHeader('Cache-Control', `stale-while-revalidate=${60 * 60}`)
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Content-Encoding', 'gzip')

  /**
   * Makes necessary API calls to get all the dynamic
   * urls from user-gen content
   */
  const posts = await sdk().posts({
    first: 100,
    locale: Locale.En,
  })

  const sitemapStream = new SitemapStream({
    hostname: 'https://danestves.com',
    xmlns: {
      news: true,
      xhtml: false,
      image: true,
      video: true,
      custom: [
        'xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html"',
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
        'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"',
      ],
    },
  })
  const pipeline = sitemapStream.pipe(createGzip())

  // Write static pages to sitemap
  STATIC_URLS.forEach((url) => {
    sitemapStream.write({ ...url, priority: 0.8 })
  })

  // Write user-generated pages to sitemap
  posts.data.posts.forEach((post) => {
    sitemapStream.write({
      changefreq: 'monthly',
      img: [
        {
          title: post.title,
          url: post.cover.url,
        },
        {
          caption: post.seo?.description,
          title: post.title,
          url: `${flyyerURL}/posts/${post.slug}`,
        },
        {
          caption: post.localizations[0].seo?.description,
          title: post.localizations[0].title,
          url: `${flyyerURL}/es/posts/${post.slug}`,
        },
      ],
      links: [
        { lang: 'en', url: `${baseURL}/posts/${post.slug}` },
        { lang: 'es', url: `${baseURL}/es/posts/${post.slug}` },
      ],
      lastmod: post.updatedAt,
      priority: 0.7,
      url: `${baseURL}/posts/${post.slug}`,
    })
  })

  sitemapStream.end()

  // stream write the response
  pipeline.pipe(res).on('error', (err) => {
    throw err
  })
}
