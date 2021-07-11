// Dependencies
import RSS from 'rss'
import type { NextApiRequest, NextApiResponse } from 'next'

// Internals
import { getAllPostsWithSlug } from '@/lib/graphcms'
import type { Locale } from '@/generated/graphql'

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<any>> {
  try {
    const baseUrl = 'https://danestves.com'

    const feed = new RSS({
      title: 'Daniel Esteves - Frontend Web Developer',
      description:
        'Daniel Esteves frontend web developer has made websites using WordPress, React, Gatsby, NextJS and more. Ready to make your dreams come true.',
      image_url: 'https://danestves.com/static/icons/favicon.ico',
      site_url: `${baseUrl}`,
      feed_url: `${baseUrl}/rss.xml`,
    })

    await getAllPostsWithSlug('en' as Locale).then((res) => {
      res.posts.map((post) => {
        return feed.item({
          title: `${post.seo?.title} | @danestves` || '',
          url: `${baseUrl}/en/blog/${post.slug}-${post.id}`,
          date: post.published,
          description: post.seo?.description || '',
        })
      })
    })
    await getAllPostsWithSlug('es' as Locale).then((res) => {
      res.posts.map((post) => {
        return feed.item({
          title: `${post.seo?.title} | @danestves` || '',
          url: `${baseUrl}/blog/${post.slug}-${post.id}`,
          date: post.published,
          description: post.seo?.description || '',
        })
      })
    })

    res.statusCode = 200

    // Set appropriate header
    res.setHeader('Content-Type', 'text/xml')
    res.send(feed.xml())
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
