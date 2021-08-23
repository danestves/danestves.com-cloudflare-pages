// Dependencies
import Image from 'next/image'
import Router from 'next/router'
import useSWR from 'swr'

// Internals
import { fetcher } from '@/lib'
import { FLAGS } from '@/utils'

export type FlagProps = {
  locale?: string
}

export const Flag = (props: FlagProps): JSX.Element => {
  const { data } = useSWR<{ country: string }>('/api/country', fetcher)
  const locale = props.locale || Router.locale

  if (!data) return null

  if (locale === 'es') {
    if (FLAGS[data.country]) {
      return (
        <Image
          alt={FLAGS[data.country].name}
          placeholder="blur"
          src={FLAGS[data.country].image}
        />
      )
    } else {
      return (
        <Image alt={FLAGS.ES.name} placeholder="blur" src={FLAGS.ES.image} />
      )
    }
  } else if (locale === 'en') {
    return <Image alt={FLAGS.US.name} placeholder="blur" src={FLAGS.US.image} />
  }
}

export default Flag
