import { useEffect } from 'react'
import useSWR from 'swr'
import format from 'comma-number'

async function fetcher(...args: any): Promise<any> {
  // eslint-disable-next-line
  // @ts-ignore
  const res = await fetch(...args)

  return res.json()
}

export default function ViewCounter({ slug }: { slug: string }): JSX.Element {
  const { data } = useSWR(`/api/views/${slug}`, fetcher)
  const views = data?.total

  useEffect(() => {
    const registerView = (): Promise<Response> =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    registerView()
  }, [slug])

  return <>{views ? format(views) : '–––'} vistas</>
}
