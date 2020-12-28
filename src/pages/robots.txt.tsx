// Dependencies
import * as React from 'react'
import { NextPage } from 'next'

const createRobots = (host: string): string => {
  return `
User-agent: *
Disallow: /
    
Sitemap: https://${host}/sitemap.xml
`
}

const RobotsPage: NextPage = () => {
  return <></>
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
RobotsPage.getInitialProps = async ({ req, res }) => {
  const robots = createRobots((req && req.headers.host) || '')

  res && res.setHeader('Content-Type', 'text/plain')
  res && res.write(robots)
  res && res.end()

  return res
}

export default RobotsPage
