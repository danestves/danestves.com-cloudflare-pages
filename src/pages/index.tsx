// Dependencies
import type { I18nProps } from 'next-rosetta'
import type { GetStaticProps, NextPage } from 'next'

// Internals
import { Hero } from '@/components/Sections'
import { Videos } from '@/interfaces'
import { getVideos } from '@/lib'
import type { Locale } from 'i18n'

export type HomePageProps = {
  videos: Videos
}

export const HomePage: NextPage<HomePageProps> = () => {
  return (
    <>
      <Hero />
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const videos = await getVideos()

  return { props: { table, videos } }
}

export default HomePage
