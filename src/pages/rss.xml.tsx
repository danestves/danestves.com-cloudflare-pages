// Dependencies
import type { GetServerSideProps } from 'next'

// Internals
import { getRSS } from '@/utils'

export default function RSSPage() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = await getRSS()

  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()

  return {
    props: {},
  }
}
