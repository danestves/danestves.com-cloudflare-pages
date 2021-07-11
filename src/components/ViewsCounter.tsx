// Dependencies
import * as React from 'react'
import { useI18n } from 'next-rosetta'
import useSWR from 'swr'

// Internals
import fetcher from '@/lib/fetcher'
import { formatCommaNumber } from '@/utils'
import type { MyLocale } from 'i18n'

export function ViewCounter({ slug }: { slug: string }): JSX.Element {
  const { t } = useI18n<MyLocale>()
  const { data } = useSWR(`/api/views/${slug}`, fetcher)
  const views = (data as unknown as Record<string, unknown>)?.total

  React.useEffect(() => {
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
