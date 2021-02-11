// Dependencies
import { useEffect } from 'react'
import useSWR from 'swr'
import format from 'comma-number'
import { useI18n } from 'next-rosetta'

// Libraries
import fetcher from '@/lib/fetcher'

// Locales
import type { MyLocale } from 'i18n'

export default function ViewCounter({ slug }: { slug: string }): JSX.Element {
  const { t } = useI18n<MyLocale>()
  const { data } = useSWR(`/api/views/${slug}`, fetcher)
  const views = ((data as unknown) as Record<string, unknown>)?.total

  useEffect(() => {
    const registerView = (): Promise<Response> =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    registerView()
  }, [slug])

  return (
    <>
      {views ? format(views) : '–––'} {t('blog.visits')}
    </>
  )
}
