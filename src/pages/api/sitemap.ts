// Dependencies
import { NextApiRequest, NextApiResponse } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

// @types
import { Locale } from '@/generated/graphql'

// Libraries
import { getAllPostsWithSlug } from '@/lib/graphcms'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<any>> => {
  if (req.method === 'GET') {
    try {
      const links: any = [
        {
          url: 'https://danestves.com/en',
          changefreq: 'monthly',
          priority: 0.3,
        },
        {
          url: 'https://danestves.com/blog',
          changefreq: 'weekly',
          priority: 0.3,
        },
        {
          url: 'https://danestves.com/en/blog',
          changefreq: 'weekly',
          priority: 0.3,
        },
        {
          url: 'https://danestves.com/portafolio',
          changefreq: 'monthly',
          priority: 0.3,
        },
        {
          url: 'https://danestves.com/en/portafolio',
          changefreq: 'monthly',
          priority: 0.3,
        },
      ]

      await getAllPostsWithSlug('en' as Locale).then((res) => {
        res.posts.map((post) => {
          return links.push({
            url: `https://danestves.com/en/blog/${post.slug}-${post.id}`,
            lastmod: post.updatedAt,
            changefreq: 'weekly',
            priority: 0.3,
          })
        })
      })
      await getAllPostsWithSlug('es' as Locale).then((res) => {
        res.posts.map((post) => {
          return links.push({
            url: `https://danestves.com/blog/${post.slug}-${post.id}`,
            lastmod: post.updatedAt,
            changefreq: 'weekly',
            priority: 0.3,
          })
        })
      })

      const stream = new SitemapStream({ hostname: 'https://danestves.com' })
      const sitemap = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
        data.toString()
      )

      res.setHeader('Content-Type', 'application/xml')
      return res.status(200).send(sitemap)
    } catch (error) {
      return res.status(500).json({ error: error.message || error.toString() })
    }
  }

  return res.status(400).send('Method not allowed')
}
