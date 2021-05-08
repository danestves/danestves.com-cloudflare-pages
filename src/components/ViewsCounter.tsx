// Dependencies
import { useEffect } from 'react'
import useSWR from 'swr'
import { useI18n } from 'next-rosetta'

// Libraries
import fetcher from '@/lib/fetcher'

// Locales
import type { MyLocale } from 'i18n'

// Utils
import { formatCommaNumber } from '@/utils'

export function ViewCounter({ slug }: { slug: string }): JSX.Element {
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
      {views ? formatCommaNumber(views as number) : '–––'} {t('blog.visits')}
    </>
  )
}
