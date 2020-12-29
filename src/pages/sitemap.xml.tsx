// Dependencies
import * as React from 'react'
import { NextPage } from 'next'

// Generated
import { Portfolio, Post } from '@/generated/graphql'

// Lib
import { getApolloClient } from '@/lib/apollo'

// Queries
import GET_PORTFOLIO_SLUGS from '@/graphql/portfolioSlugs.query'
import GET_POST_SLUGS from '@/graphql/postSlugs.query'

// Utils
import { formatDate } from '@/utils'

const toUrl = (host: string, route: string): string => {
  return `<url>
    <loc>https://${host}${route}</loc>
    <lastmod>${formatDate(new Date(), 'yyyy-MM-dd')}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>`
}

const createSitemap = (host: string, portfolios: string[], posts: string[]): string => {
  return `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      <url>
        <loc>https://${host}/</loc>
        <lastmod>${formatDate(new Date(), 'yyyy-MM-dd')}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>https://${host}/sobre-mi</loc>
        <lastmod>${formatDate(new Date(), 'yyyy-MM-dd')}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>https://${host}/open-source</loc>
        <lastmod>${formatDate(new Date(), 'yyyy-MM-dd')}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>https://${host}/portafolio</loc>
        <lastmod>${formatDate(new Date(), 'yyyy-MM-dd')}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>https://${host}/blog</loc>
        <lastmod>${formatDate(new Date(), 'yyyy-MM-dd')}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>https://${host}/contacto</loc>
        <lastmod>${formatDate(new Date(), 'yyyy-MM-dd')}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>
      ${portfolios.map((route) => toUrl(host, route)).join('')}
      ${posts.map((route) => toUrl(host, route)).join('')}
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
  const { data: data1 } = await apollo.query({
    query: GET_PORTFOLIO_SLUGS,
    variables: {
      first: 100,
    },
  })
  const { data: data2 } = await apollo.query({
    query: GET_POST_SLUGS,
    variables: {
      first: 100,
    },
  })

  const portfolios = data1.portfolios.map((portfolio: Portfolio) => `/portafolio/${portfolio.slug}`)
  const posts = data2.posts.map((post: Post) => `/blog/${post.slug}`)

  const sitemap = createSitemap((req && req.headers.host) || '', portfolios, posts)

  res && res.setHeader('Content-Type', 'text/xml')
  res && res.write(sitemap)
  res && res.end()

  return res
}

export default SitemapPage
