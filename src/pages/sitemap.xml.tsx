// Dependencies
import * as React from 'react'
import { NextPage } from 'next'

// Interfaces
import { FrontMatterPortfolio, FrontMatterPost } from '@/interfaces'

// Libraries
import { getFiles } from '@/lib/mdx'

// Utils
import { formatDate } from '@/utils'

const toUrl = (host: string, item: FrontMatterPortfolio | FrontMatterPost): string => {
  const date = new Date(item.publishedAt)

  return `<url>
    <loc>https://${host}${item.slug}</loc>
    <lastmod>${date.getFullYear()}-${date.getMonth()}-${date.getDate()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>`
}

const createSitemap = (
  host: string,
  portfolios: FrontMatterPortfolio[],
  posts: FrontMatterPost[]
): string => {
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
      ${portfolios.map((portfolio) => toUrl(host, portfolio)).join('')}
      ${posts.map((post) => toUrl(host, post)).join('')}
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
  const postsData: unknown = await getFiles('blog')
  const portfoliosData: unknown = await getFiles('portfolio')

  const portfolios = (portfoliosData as FrontMatterPortfolio[]).map((portfolio) => {
    return {
      ...portfolio,
      slug: `/portafolio/${portfolio.slug}`,
    }
  })
  const posts = (postsData as FrontMatterPost[]).map((post) => {
    return {
      ...post,
      slug: `/blog/${post.slug}`,
    }
  })

  const sitemap = createSitemap((req && req.headers.host) || '', portfolios, posts)

  res && res.setHeader('Content-Type', 'text/xml')
  res && res.write(sitemap)
  res && res.end()

  return res
}

export default SitemapPage
