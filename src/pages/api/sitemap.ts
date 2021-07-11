// Dependencies
import builder from 'xmlbuilder'
import type { NextApiRequest, NextApiResponse } from 'next'

// Internals
import { getAllPostsWithSlug } from '@/lib/graphcms'
import type { Locale } from '@/generated/graphql'

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const pages = [
      '',
      '/sobre-mi',
      '/open-source',
      '/portafolio',
      '/blog',
      '/contacto',
    ]
    const languages = ['en', 'es']

    // Generate Sitemap
    const newbuilder = builder
      .begin()
      .i('xml-stylesheet', 'type="text/xsl" href="/sitemap.xsl"')
      .dec('1.0', 'UTF-8', true)
    const root = newbuilder.node('urlset')
    root.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

    pages.map((page) => {
      languages.map((lang) => {
        const url = root.ele('url')

        url.ele(
          'loc',
          `https://danestves.com${lang === 'es' ? '' : `/${lang}`}${page}`
        )
        url.ele('priority', `0.3`)
      })
    })

    await getAllPostsWithSlug('en' as Locale).then((res) => {
      res.posts.map((post) => {
        const url = root.ele('url')

        url.ele('loc', `https://danestves.com/en/blog/${post.slug}-${post.id}`)
        url.ele('lastmod', `${new Date(post.updatedAt).toISOString()}`)
        url.ele('changefreq', `monthly`)
        url.ele('priority', `0.8`)
      })
    })
    await getAllPostsWithSlug('es' as Locale).then((res) => {
      res.posts.map((post) => {
        const url = root.ele('url')

        url.ele('loc', `https://danestves.com/blog/${post.slug}-${post.id}`)
        url.ele('lastmod', `${new Date(post.updatedAt).toISOString()}`)
        url.ele('changefreq', `monthly`)
        url.ele('priority', `0.8`)
      })
    })

    const xml = root.end({ pretty: true })

    res.statusCode = 200

    // Set appropriate header
    res.setHeader('Content-Type', 'text/xml')
    res.send(xml)
  } catch (error) {
    console.error(error)

    res.status(500).send({ message: 'Server Error' })
  }
}
