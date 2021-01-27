// Dependencies
import axios from '@/lib/axios'
import { format } from 'date-fns'
import es from 'date-fns/locale/es'

/**
 * Format the received date using [date-fns](https://date-fns.org/)
 * that is a lightweight library to format dates
 *
 * @param date - The date to format
 * @param formatter - The way to format the date
 *
 * @returns The string with the formatted date
 */
export const formatDate = (date: string | Date, formatter = 'mm/dd/yyyy'): string => {
  return format(new Date(date), formatter, {
    locale: es,
  })
}

/**
 * According to [this post](https://irisreading.com/what-is-the-average-reading-speed/#:~:text=Many%20resources%20indicate%20that%20the,around%20300%20words%20per%20minute.)
 * the human can read between 200-250 words per minute (wpm)
 * to get a metric we going to put in the minimum words (200)
 * we catch the length of words and later multiply the
 * number of words with the words per minute
 * finally round result with `Math.ceil()`
 *
 * @param text - The string to analyze
 * @param singular - The sentence to show when reading time is equal to 1
 * @param plural - The sentence to show when reading time is moren than 1
 *
 * @returns The estimated reading time
 */
export const readingTime = ({
  text,
  wordCount = 0,
  singular = 'minuto de lectura',
  plural = 'minutos de lectura',
}: {
  text?: string
  wordCount?: number
  singular?: string
  plural?: string
}): string => {
  const wordsPerMinute = 200
  const noOfWords = text ? text.split(/\s/g).length : wordCount
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)

  return readTime === 1 ? `${readTime} ${singular}` : `${readTime} ${plural}`
}

/**
 * Generator of URL for open graph images
 *
 * @param title - The title to show in the image
 * @param tags - The tags to show in the image (optional)
 *
 * @returns The string with the generated URL to show the image
 */
export const openGraphImgGenerator = (title: string, tags?: string[]): string => {
  return `https://generator.opengraphimg.com/?title=${decodeURIComponent(
    decodeURIComponent(title)
  )}${
    tags ? `&tags=${tags?.map((name: string) => name).join(`,`)}` : ''
  }&author=danestves&background=00C389FF&boxBackground=071D49FF&titleMargin=-mt-12&tagsSize=text-3xl&atSymbol=true&authorSize=text-3xl`
}

export const fetcher = (url: string): Promise<Response> => axios.get(url).then((r) => r.data)
