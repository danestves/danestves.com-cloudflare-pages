// Dependencies
import { useRouter } from 'next/router'
import useSWR from 'swr'

// Internals
import { LocalImage } from '@/components/LocalImage'
import { fetcher } from '@/lib/fetcher'
import { ES_FLAGS, US_FLAG } from '@/utils'

export type FlagProps = {
  locale?: string
}

export const Flag = (props: FlagProps): JSX.Element => {
  const router = useRouter()
  const { data } = useSWR<{ country: string }>('/api/country', fetcher)
  const locale = props.locale || router.locale

  if (!data) return null

  if (locale === 'es') {
    if (ES_FLAGS[data.country]) {
      return (
        <LocalImage
          image={{
            alt: ES_FLAGS[data.country].name,
            placeholder: 'blur',
            src: ES_FLAGS[data.country].image,
          }}
        />
      )
    } else {
      return (
        <LocalImage
          image={{
            alt: ES_FLAGS.ES.name,
            placeholder: 'blur',
            src: ES_FLAGS.ES.image,
          }}
        />
      )
    }
  } else if (locale === 'en') {
    return (
      <LocalImage
        image={{
          alt: US_FLAG.name,
          placeholder: 'blur',
          src: US_FLAG.image,
        }}
      />
    )
  }
}

export default Flag
