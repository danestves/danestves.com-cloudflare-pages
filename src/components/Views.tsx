// Dependencies
import * as React from 'react'
import { useI18n } from 'next-rosetta'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'

// Internals
import { fetcher } from '@/lib/fetcher'
import type { Locale } from 'i18n'

export type ViewsProps = {
  slug: string
}

export const Views = ({ slug }: ViewsProps): JSX.Element => {
  const { t } = useI18n<Locale>()
  const { data } = useSWR<{ views: number }>(`/api/views/${slug}`, fetcher)

  React.useEffect(() => {
    const registerView = (): Promise<Response> =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    registerView()
  }, [slug])

  return (
    <>
      <NextSeo
        additionalMetaTags={[
          {
            property: 'flyyer:views',
            content: `${data?.views ?? 0}`,
          },
        ]}
      />
      <span className="px-3 py-2 text-xs font-bold text-black rounded-full bg-primary">
        {data?.views ? data.views : '---'} {t('components.views')}
      </span>
    </>
  )
}

export default Views
