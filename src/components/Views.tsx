// Dependencies
import * as React from 'react'
import { useI18n } from 'next-rosetta'

// Internals
import type { Locale } from 'i18n'
import useRequest from '@/hooks/useRequest'

export type ViewsProps = {
  slug: string
  views: string
}

export const Views = ({ slug, ...props }: ViewsProps): JSX.Element => {
  const { t } = useI18n<Locale>()
  const { data } = useRequest<{ views: string }>(
    {
      url: `/api/views/${slug}`,
    },
    {
      fallbackData: {
        views: props.views,
      },
    }
  )
  const views = new Number(data?.views)

  React.useEffect(() => {
    const registerView = (): Promise<Response> =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    registerView()
  }, [slug])

  return (
    <span className="px-3 py-2 text-xs font-bold text-black rounded-full bg-primary">
      {views ? views.toLocaleString() : '---'} {t('components.views')}
    </span>
  )
}

export default Views
