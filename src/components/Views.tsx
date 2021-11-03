// Dependencies
import * as React from 'react'
import { useI18n } from 'next-rosetta'
import useSWR from 'swr'

// Internals
import { fetcher } from '@/lib/fetcher'
import type { Locale } from 'i18n'

export type ViewsProps = {
  slug: string
  views: number
}

export const Views = ({ slug, views }: ViewsProps): JSX.Element => {
  const { t } = useI18n<Locale>()
  const { data } = useSWR<{ views: number }>(`/api/views/${slug}`, fetcher, {
    fallback: { views },
  })

  React.useEffect(() => {
    const registerView = (): Promise<Response> =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    registerView()
  }, [slug])

  return (
    <span className="px-3 py-2 text-xs font-bold text-black rounded-full bg-primary">
      {data?.views ? data.views : '---'} {t('components.views')}
    </span>
  )
}

export default Views
