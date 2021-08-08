// Dependencies
import { Flyyer } from '@flyyer/flyyer'
import builder from 'xmlbuilder'

// Internals
import { sdk } from '@/lib/graphcms'
import defaultSeo from 'seoConfig'

const baseUrl = 'https://danestves.com'

/**
 * @function generateSitemap
 * @description Generate the sitemap.xml
 */
export async function getSitemap(): Promise<string> {
  const { data } = await sdk().getSitemapData()

  const pages = [
    '',
    '/sobre-mi',
    '/open-source',
    '/portafolio',
    '/blog',
    '/contacto',
    '/uses',
  ]
  const languages = ['en', 'es']
  let posts: any[] = []
  let portfolios: any[] = []
  data.posts.map((post) =>
    post.localizations.map((locale) => posts.push(locale))
  )
  data.portfolios.map((portfolio) =>
    portfolio.localizations.map((locale) => portfolios.push(locale))
  )

  // Generate Sitemap
  const newbuilder = builder.begin().dec('1.0', 'UTF-8', true)
  const root = newbuilder.node('urlset')
  root.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
  root.att('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1')
  root.att('xmlns:mobile', 'http://www.google.com/schemas/sitemap-mobile/1.0')
  root.att('xmlns:news', 'http://www.google.com/schemas/sitemap-news/0.9')
  root.att('xmlns:video', 'http://www.google.com/schemas/sitemap-video/1.1')
  root.att('xmlns:xhtml', 'http://www.w3.org/TR/xhtml11/xhtml11_schema.html')

  pages.map((page) => {
    languages.map((lang) => {
      const url = root.ele('url')
      const locale = lang === 'es' ? '' : `/${lang}`
      const { title, description } = defaultSeo(lang || 'es')

      url.ele('loc', `https://danestves.com${locale}${page}`)
      url.ele('changefreq', `weekly`)
      url.ele('priority', `0.7`)
      url.ele('lastmod', new Date().toISOString())
      url
        .ele('image:image')
        .ele('image:loc')
        .cdata(`https://cdn.flyyer.io/v2/danestves-com/_/_${locale}${page}`)
        .up()
        .ele('image:caption')
        .cdata(description)
        .up()
        .ele('image:title')
        .cdata(title)
      url.ele('xhtml:link', {
        rel: 'alternate',
        hreflang: 'en',
        href: `https://danestves.com/en${page}`,
      })
      url.ele('xhtml:link', {
        rel: 'alternate',
        hreflang: 'es',
        href: `https://danestves.com${page}`,
      })
    })
  })
  posts.map((post) => {
    const lang = post.locale === 'es' ? '' : '/en'
    const postUrl = `${baseUrl}${lang}/blog/${post.slug}-${post.id}`
    const alternate = `${baseUrl}${'/' + post.localizations[0].locale}/blog/${
      post.localizations[0].slug
    }-${post.localizations[0].id}`
    const flayyer = new Flyyer({
      project: 'danestves-com',
      path: `${lang}/blog/${post.slug}-${post.id}`,
      meta: {
        id: post.slug + '-' + post.id,
      },
    })

    const url = root.ele('url')
    url.ele('loc', postUrl)
    url.ele('changefreq', `daily`)
    url.ele('priority', `0.7`)
    url.ele('lastmod', post.updatedAt)
    url
      .ele('image:image')
      .ele('image:loc')
      .cdata(flayyer.href())
      .up()
      .ele('image:caption')
      .cdata(post.seo.description)
      .up()
      .ele('image:title')
      .cdata(post.title)
    url.ele('xhtml:link', {
      rel: 'alternate',
      hreflang: 'en',
      href: post.locale === 'en' ? postUrl : alternate,
    })
    url.ele('xhtml:link', {
      rel: 'alternate',
      hreflang: 'es',
      href: post.locale === 'es' ? postUrl : alternate,
    })
  })

  const xml = root.end({ pretty: true })

  return xml
}
