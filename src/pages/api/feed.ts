// Dependencies
import RSS from 'rss'
import { createGzip } from 'zlib'
import type { NextApiRequest, NextApiResponse } from 'next'

// Internals
import { Locale } from '@/generated/graphql'
import { sdk } from '@/lib/graphcms'

const baseURL = 'https://danestves.com'

export default async function handler(
  _: NextApiRequest,
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

  const feed = new RSS({
    feed_url: `${baseURL}/feed.xml`,
    site_url: baseURL,
    title: 'danestves | Frontend Content Creator, React, Vue and CSS',
    description:
      'Content about JavaScript, web development, frontend skills, React, Vue, CSS and much, much more.',
    image_url: `${baseURL}/logo.png`,
    language: 'en',
    ttl: 60,
    webMaster: '@danestves',
  })

  posts.data.posts.forEach((post) => {
    feed.item({
      date: post.published,
      description: post.seo?.description,
      title: post.title,
      url: `${baseURL}/posts/${post.slug}`,
      author: '@danestves',
      categories: post.tags?.map((tag) => tag.name),
      guid: `${baseURL}/posts/${post.slug}`,
    })
  })

  return res.send(createGzip().end(feed.xml()))
}
