// Dependencies
import type { GetServerSideProps } from 'next'

// Internals
import { getSitemap } from '@/utils'

export default function SitemapPage() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = await getSitemap()

  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()

  return {
    props: {},
  }
}
