// Dependencies
import { Flyyer } from '@flyyer/flyyer'
import builder from 'xmlbuilder'

// Internals
import { sdk } from '@/lib/graphcms'
import defaultSeo from 'seoConfig'

const baseUrl = 'https://danestves.com'

/**
 * @function generateRSS
 * @description Generate RSS feed
 */
export async function getRSS(): Promise<string> {
  const { data } = await sdk().getAllPostsForBlogPage({
    body: false,
    limit: 100,
    locale: 'es' as any,
    search: '',
  })

  // Generate Sitemap
  const newbuilder = builder.begin().dec('1.0', 'UTF-8', true)
  const root = newbuilder.node('rss', {
    'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
    'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
    'xmlns:atom': 'http://www.w3.org/2005/Atom',
    version: '2.0',
    'xmlns:sitemap': 'http://www.sitemaps.org/schemas/sitemap/0.9',
  })
  const { title, description } = defaultSeo('es')

  root
    .node('channel')
    .ele('title', title)
    .up()
    .ele('link', baseUrl)
    .up()
    .ele('description', description)
    .up()
    .ele('language', 'es-ES')
    .up()
    .ele('lastBuildDate', new Date().toISOString())
    .up()
    .ele('atom:link', {
      href: `${baseUrl}/rss.xml`,
      rel: 'self',
      type: 'application/rss+xml',
    })
    .up()
    .ele('image')
    .ele('url', 'https://danestves.com/static/icons/favicon.ico')
    .up()
    .ele('title', title)

  data.posts.map((post) => {
    const item = root.node('item')

    item.ele('title').cdata(post.title)
    item.ele('description').cdata(post.seo.description)
    item.ele(
      'link',
      {
        isPermalink: 'true',
      },
      `${baseUrl}/blog/${post.slug}-${post.id}`
    )
    item.ele('pubDate', post.published)
    item.ele('guid', `${baseUrl}/blog/${post.slug}-${post.id}`)
  })

  const xml = root.end({ pretty: true })

  return xml
}
