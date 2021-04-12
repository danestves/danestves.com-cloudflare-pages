// Dependencies
import React from 'react'

class Sitemap extends React.Component {
  static async getInitialProps({ req, res }: any): Promise<any> {
    const protocol = req.headers.referer?.split('://')[0] || 'http'
    const host = req.headers.host
    const sitemap = await fetch(`${protocol}://${host}/api/sitemap`).then((res) => res.text())

    res.setHeader('Content-Type', 'application/xml')
    res.write(sitemap)
    res.end()
  }
}

export default Sitemap
