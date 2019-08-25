const fs = require('fs-extra')
const getPathsObject = require('./getPathsObject')
const formatDate = require('./formatDate')

// ROBOTS.txt
const robotsTxt = `User-agent: *
Sitemap: https://dev.danestves.com/sitemap.xml
Disallow: /`

fs.writeFileSync('.next/robots.txt', robotsTxt)
console.log('robots.txt saved!')

// SITEMAP.XML
const pathsObj = getPathsObject()
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  ${Object.keys(pathsObj).map(
    path => `<url>
    <loc>https://dev.danestves.com${path}/</loc>
    <lastmod>${formatDate(new Date(pathsObj[path].lastModified))}</lastmod>
  </url>`
  ).join('')}
</urlset>`

fs.writeFileSync('.next/sitemap.xml', sitemapXml)
console.log('sitemap.xml saved!')
