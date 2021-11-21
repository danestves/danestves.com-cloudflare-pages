// Dependencies
import { writeFileSync } from 'fs'
import { SitemapStream, streamToPromise } from 'sitemap'
import { allEnglishPosts, allSpanishPosts } from '.contentlayer/data'

const BASE_URL = 'https://danestves.com'
const FLYYER_URL = 'https://cdn.flyyer.io/v2/danestves/_/_'
const STATIC_URLS = [
  {
    changefreq: 'monthly',
    img: [
      {
        url: `${FLYYER_URL}/`,
      },
      {
        url: `${FLYYER_URL}/es`,
      },
    ],
    links: [
      { lang: 'en', url: `${BASE_URL}/` },
      { lang: 'es', url: `${BASE_URL}/es` },
    ],
    url: `${BASE_URL}/`,
  },
  {
    changefreq: 'monthly',
    img: [
      {
        url: `${FLYYER_URL}/portfolio`,
      },
      {
        url: `${FLYYER_URL}/es/portfolio`,
      },
    ],
    links: [
      { lang: 'en', url: `${BASE_URL}/portfolio` },
      { lang: 'es', url: `${BASE_URL}/es/portfolio` },
    ],
    url: `${BASE_URL}/portfolio`,
  },
  {
    changefreq: 'monthly',
    img: [
      {
        url: `${FLYYER_URL}/posts`,
      },
      {
        url: `${FLYYER_URL}/es/posts`,
      },
    ],
    links: [
      { lang: 'en', url: `${BASE_URL}/posts` },
      { lang: 'es', url: `${BASE_URL}/es/posts` },
    ],
    url: `${BASE_URL}/posts`,
  },
]

async function generateSitemap() {
  const sitemap = new SitemapStream({
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

  // Write static pages to sitemap
  STATIC_URLS.forEach((url) => {
    sitemap.write({ ...url, priority: 0.8 })
  })

  const posts = allEnglishPosts.map((post) => ({
    ...post,
    localizations: [
      {
        ...allSpanishPosts.find(
          (spanishPost) => spanishPost.slug === post.slug
        ),
      },
    ],
  }))

  // Write user-generated pages to sitemap
  posts.forEach((post) => {
    const lastmod = new Date(post.publishedAt.slice(0, 10))

    sitemap.write({
      changefreq: 'monthly',
      img: [
        {
          title: post.title,
          url: `${BASE_URL}${post.cover}`,
        },
        {
          caption: post.seo?.description,
          title: post.title,
          url: `${FLYYER_URL}/posts/${post.slug}`,
        },
        {
          caption: post.localizations[0].seo?.description,
          title: post.localizations[0].title,
          url: `${FLYYER_URL}/es/posts/${post.slug}`,
        },
      ],
      links: [
        { lang: 'en', url: `${BASE_URL}/posts/${post.slug}` },
        { lang: 'es', url: `${BASE_URL}/es/posts/${post.slug}` },
      ],
      lastmod,
      priority: 0.7,
      url: `${BASE_URL}/posts/${post.slug}`,
    })
  })

  sitemap.end()

  return streamToPromise(sitemap).then((data) =>
    writeFileSync('./public/sitemap.xml', data.toString())
  )
}

generateSitemap()
