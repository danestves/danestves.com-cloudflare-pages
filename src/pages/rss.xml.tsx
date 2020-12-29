// Dependencies
import * as React from 'react'
import { NextPage } from 'next'

// Generated
import { Post } from '@/generated/graphql'

// Lib
import { getApolloClient } from '@/lib/apollo'

// Queries
import GET_RSS_POSTS from '@/graphql/postsRss.query'

// Utils
import { formatDate } from '@/utils'

const toUrl = (host: string, post: Post, route: string): string => {
  return `<url>
    <title>${post.title}</title>
    <guid>https://${host}/blog/${route}</guid>
    <link>https://${host}/blog/${route}</link>
    <lastmod>${formatDate(new Date(), 'yyyy-MM-dd')}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>`
}

const createSitemap = (host: string, posts: string[]): string => {
  return `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      ${posts.map((post: any) => toUrl(host, post, post.slug)).join('')}
    </urlset>
  `
}

const SitemapPage: NextPage = () => {
  return <></>
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
SitemapPage.getInitialProps = async ({ req, res }) => {
  const apollo = getApolloClient()
  const { data } = await apollo.query({
    query: GET_RSS_POSTS,
    variables: {
      first: 100,
    },
  })

  const posts = data.posts.map((post: Post) => post)

  const sitemap = createSitemap((req && req.headers.host) || '', posts)

  res && res.setHeader('Content-Type', 'text/xml')
  res && res.write(sitemap)
  res && res.end()

  return res
}

export default SitemapPage
