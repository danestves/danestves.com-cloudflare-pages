// Dependencies
import Gif from '@giphy/react-components/dist/components/gif'
import Image from 'next/image'
import useSWR from 'swr'
import type { IGif } from '@giphy/js-types'

// Internals
import { GeneralObserver } from '@/components/GeneralObserver'
import { fetcher } from '@/lib/fetcher'

export function Giphy({ id }: { id: string }): JSX.Element | null {
  const { data } = useSWR(`/api/giphy/${id}`, fetcher)
  const gif = (data as unknown as Record<string, unknown>)?.gif as IGif

  if (!gif) return null

  return (
    <GeneralObserver>
      <Gif gif={gif} width={300} />
      <a
        className="inline-flex mt-2 overflow-hidden rounded"
        href="https://giphy.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt="Giphy GIF"
          height={42}
          src="/static/giphy-copyright.gif"
          width={200}
        />
      </a>
    </GeneralObserver>
  )
}

export default Giphy
