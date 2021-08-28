// Dependencies
import { formatDistanceToNow } from 'date-fns'
import es from 'date-fns/locale/es'

export type FromNowProps = {
  date: string | Date
  locale?: 'en' | 'es' | string
}

export const fromNow = ({ date, locale = 'en' }: FromNowProps): string => {
  return formatDistanceToNow(new Date(date), {
    locale: locale === 'es' ? es : undefined,
    addSuffix: true,
  })
}
