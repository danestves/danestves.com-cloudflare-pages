const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

async function generate() {
  const feed = new RSS({
    title: 'Daniel Esteves',
    site_url: 'https://danestves.com',
    feed_url: 'https://danestves.com/rss.xml',
  })

  const postsEnglish = await fs.readdir(path.join(__dirname, '..', 'data', 'posts', 'en'))
  const postsSpanish = await fs.readdir(path.join(__dirname, '..', 'data', 'posts', 'es'))

  await Promise.all(
    postsEnglish.map(async (name) => {
      const content = await fs.readFile(path.join(__dirname, '..', 'data', 'posts', 'en', name))
      const frontmatter = matter(content)

      feed.item({
        title: frontmatter.data.title,
        url: 'https://danestves.com/en/blog/' + name.replace(/\.mdx?/, ''),
        date: frontmatter.data.publishedAt,
        description: frontmatter.data.summary,
      })
    })
  )

  await Promise.all(
    postsSpanish.map(async (name) => {
      const content = await fs.readFile(path.join(__dirname, '..', 'data', 'posts', 'es', name))
      const frontmatter = matter(content)

      feed.item({
        title: frontmatter.data.title,
        url: 'https://danestves.com/blog/' + name.replace(/\.mdx?/, ''),
        date: frontmatter.data.publishedAt,
        description: frontmatter.data.summary,
      })
    })
  )

  feed.items.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  await fs.writeFile('./public/rss.xml', feed.xml({ indent: true }))
}

generate()
