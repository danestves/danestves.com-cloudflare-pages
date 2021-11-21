// Dependencies
import { useRouter } from 'next/router'

// Internals
import { LocalImage } from './LocalImage'
import { ES_FLAGS, US_FLAG } from '@/utils'

export type FlagProps = {
  countryCode: string
  locale?: string
}

export const Flag = (props: FlagProps): JSX.Element => {
  const router = useRouter()
  const countryCode = props.countryCode
  const locale = props.locale || router.locale

  if (locale === 'es') {
    if (ES_FLAGS[countryCode]) {
      return (
        <LocalImage
          image={{
            alt: ES_FLAGS[countryCode].name,
            placeholder: 'blur',
            src: ES_FLAGS[countryCode].image,
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
