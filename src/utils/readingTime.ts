const readingTime = (text: string): string => {
  const wordsPerMinute = 200
  const noOfWords = text.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)

  return readTime === 1 ? `${readTime} minuto de lectura` : `${readTime} minutos de lectura`
}

export default readingTime
