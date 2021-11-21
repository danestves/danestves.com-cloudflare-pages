// Dependencies
import { writeFileSync } from 'fs'
import RSS from 'rss'
import { allEnglishPosts } from '.contentlayer/data'

const BASE_URL = 'https://danestves.com'

async function generateRSS() {
  const feed = new RSS({
    feed_url: `${BASE_URL}/feed.xml`,
    site_url: BASE_URL,
    title: 'danestves | Frontend Content Creator, React, Vue and CSS',
    description:
      'Content about JavaScript, web development, frontend skills, React, Vue, CSS and much, much more.',
    image_url: `${BASE_URL}/logo.png`,
    language: 'en',
    webMaster: '@danestves',
  })

  allEnglishPosts.forEach((post) => {
    feed.item({
      date: post.publishedAt,
      description: post.seo?.description,
      title: post.title,
      url: `${BASE_URL}/posts/${post.slug}`,
      author: '@danestves',
      categories: post.tags?.map((tag) => tag),
      guid: `${BASE_URL}/posts/${post.slug}`,
    })
  })

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }))
}

generateRSS()
