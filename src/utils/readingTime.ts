/**
 * @function readingTime
 *
 * @description The normal human can only read 200 words per minute
 * we catch the length of words and later multiply the
 * number of words with the words per minute
 * finally round result with `Math.ceil()`
 *
 * @param text - The text to analyze
 * @returns In text the reading minute or minutes
 */
const readingTime = (text: string): string => {
  const wordsPerMinute = 200
  const noOfWords = text.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)

  return readTime === 1 ? `${readTime} minuto de lectura` : `${readTime} minutos de lectura`
}

export default readingTime
