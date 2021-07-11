// Dependencies
import { Gif } from '@giphy/react-components'
import Image from 'next/image'
import useSWR from 'swr'
import type { IGif } from '@giphy/js-types'

// Internals
import { GeneralObserver } from '@/components'
import fetcher from '@/lib/fetcher'

export default function Giphy({ id }: { id: string }): JSX.Element | null {
  const { data } = useSWR(`/api/giphy/${id}`, fetcher)
  const gif = (data as unknown as Record<string, unknown>)?.gif as IGif

  return gif ? (
    <GeneralObserver>
      <Gif gif={gif} width={300} />
      <a
        className="inline-flex mt-2"
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
  ) : null
}
