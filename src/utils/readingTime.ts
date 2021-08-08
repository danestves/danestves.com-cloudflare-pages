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
