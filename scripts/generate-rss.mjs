// Dependencies
import { Feed } from 'feed'
import { writeFileSync } from 'fs'
import { allEnglishPosts } from '.contentlayer/data'

const BASE_URL = 'https://danestves.com'
const FLYYER_URL = 'https://cdn.flyyer.io/v2/danestves/_/_'

async function generateRSS() {
  const feed = new Feed({
    title: 'danestves | Frontend Content Creator, React, Vue and CSS',
    description:
      'Content about JavaScript, web development, frontend skills, React, Vue, CSS and much, much more.',
    copyright: `Copyright © ${new Date().getFullYear()} danestves. All rights reserved.`,
    id: BASE_URL,
    author: {
      name: 'Daniel Esteves',
      email: 'danestves@gmail.com',
      link: 'https://github.com/danestves',
    },
    favicon: `${BASE_URL}/static/icons/favicon.ico`,
    feedLinks: {
      atom: `${BASE_URL}/rss.atom`,
      json: `${BASE_URL}/rss.json`,
      rss: `${BASE_URL}/rss.xml`,
    },
    image: `${FLYYER_URL}/`,
    language: 'en',
    link: BASE_URL,
    updated: new Date(),
  })

  allEnglishPosts.forEach((post) => {
    const publishedAt = new Date(post.publishedAt.slice(0, 10))

    feed.addItem({
      title: post.title,
      author: [
        {
          name: 'Daniel Esteves',
          email: 'danestves@gmail.com',
          link: 'https://github.com/danestves',
        },
      ],
      date: publishedAt,
      description: post.seo?.description,
      content: post.body.raw,
      link: `${BASE_URL}/posts/${post.slug}`,
      guid: `${BASE_URL}/posts/${post.slug}`,
      id: `${BASE_URL}/posts/${post.slug}`,
      image: `${FLYYER_URL}/posts/${post.slug}`,
      published: publishedAt,
    })
  })

  feed.addCategory('Technology')
  feed.addCategory('Frontend')
  feed.addCategory('React')
  feed.addCategory('Vue')
  feed.addCategory('CSS')
  feed.addCategory('JavaScript')
  feed.addCategory('Web Development')

  writeFileSync('./public/feed.atom', feed.atom1())
  writeFileSync('./public/feed.json', feed.json1())
  writeFileSync('./public/feed.rss', feed.rss2())
  writeFileSync('./public/feed.xml', feed.rss2())
}

generateRSS()
