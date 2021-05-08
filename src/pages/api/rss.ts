// Dependencies
import { NextApiRequest, NextApiResponse } from 'next'
import RSS from 'rss'

// Generated
import { Locale } from '@/generated/graphql'

// Libraries
import { getAllPostsWithSlug } from '@/lib/graphcms'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<any>> => {
  const protocol = req.headers.referer?.split('://')[0] || 'http'
  const host = req.headers.host

  try {
    const feed = new RSS({
      title: 'Daniel Esteves - Frontend Web Developer',
      description:
        'Daniel Esteves frontend web developer has made websites using WordPress, React, Gatsby, NextJS and more. Ready to make your dreams come true.',
      image_url: 'https://danestves.com/static/icons/favicon.ico',
      site_url: `${protocol}://${host}`,
      feed_url: `${protocol}://${host}/rss.xml`,
    })

    await getAllPostsWithSlug('en' as Locale).then((res) => {
      res.posts.map((post) => {
        return feed.item({
          title: `${post.seo?.title} | @danestves` || '',
          url: `${protocol}://${host}/en/blog/${post.slug}-${post.id}`,
          date: post.published,
          description: post.seo?.description || '',
        })
      })
    })
    await getAllPostsWithSlug('es' as Locale).then((res) => {
      res.posts.map((post) => {
        return feed.item({
          title: `${post.seo?.title} | @danestves` || '',
          url: `${protocol}://${host}/blog/${post.slug}-${post.id}`,
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
