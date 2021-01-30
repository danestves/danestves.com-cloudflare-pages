// Dependencies
import { useEffect } from 'react'
import useSWR from 'swr'
import format from 'comma-number'

// Libraries
import fetcher from '@/lib/fetcher'

export default function ViewCounter({ slug }: { slug: string }): JSX.Element {
  const { data } = useSWR(`/api/views/${slug}`, fetcher)
  const views = ((data as unknown) as Record<string, unknown>)?.total

  useEffect(() => {
    const registerView = (): Promise<Response> =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    registerView()
  }, [slug])

  return <>{views ? format(views) : '–––'} visitas</>
}
