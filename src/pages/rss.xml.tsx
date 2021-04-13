// Dependencies
import React from 'react'
import { NextPageContext } from 'next'

class RSS extends React.Component {
  static async getInitialProps({ req, res }: NextPageContext): Promise<any> {
    const protocol = req?.headers.referer?.split('://')[0] || 'http'
    const host = req?.headers.host
    const rss = await fetch(`${protocol}://${host}/api/rss`).then((res) => res.text())

    res?.setHeader('Content-Type', 'application/xml')
    res?.write(rss)
    res?.end()
  }
}

export default RSS
