// Dependencies
import { format, formatDistanceToNow } from 'date-fns'
import es from 'date-fns/locale/es'

/**
 * Format the received date using [date-fns](https://date-fns.org/)
 * that is a lightweight library to format dates
 *
 * @param date The date to format
 * @param formatter The way to format the date
 *
 * @returns The string with the formatted date
 */
export const formatDate = (date: string | Date, formatter = 'mm/dd/yyyy', lang = 'en'): string => {
  let locale

  switch (lang) {
    case 'es':
      locale = es
      break
    default:
      locale = undefined
      break
  }

  return format(new Date(date), formatter, {
    locale,
  })
}

export const fromNow = (date: string | Date, lang = 'en'): string => {
  let locale

  switch (lang) {
    case 'es':
      locale = es
      break
    default:
      locale = undefined
      break
  }

  return formatDistanceToNow(new Date(date), {
    locale,
    addSuffix: true,
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
 * @param text The string to analyze
 * @param singular The sentence to show when reading time is equal to 1
 * @param plural The sentence to show when reading time is moren than 1
 *
 * @returns The estimated reading time
 */
export const readingTime = ({
  text,
  wordCount = 0,
  lang = 'en',
}: {
  text?: string
  wordCount?: number
  lang?: string
}): string => {
  const wordsPerMinute = 200
  const noOfWords = text ? text.split(/\s/g).length : wordCount
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  let singular
  let plural

  switch (lang) {
    case 'es':
      singular = 'minuto de lectura'
      plural = 'minutos de lectura'

      break
    default:
      singular = 'min read'
      plural = 'min read'

      break
  }

  return readTime === 1 ? `${readTime} ${singular}` : `${readTime} ${plural}`
}

/**
 * Returns if a target string contains any of the words of the pattern
 *
 * @param target The string to analyze
 * @param pattern The array of words for regex
 */
export const contains = (target: string, pattern: string[]): boolean => {
  const value = new RegExp(pattern.join('|')).test(target)

  return value
}

/**
 * Format the given string (of number) or number to a readable format
 *
 * @param number The number to format
 * @returns The string formated
 */
export const formatCommaNumber = (number: number | string): string => {
  return new Intl.NumberFormat().format(Number(number))
}
