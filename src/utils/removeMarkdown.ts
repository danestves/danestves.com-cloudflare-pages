// Dependencies
import removeMarkdown from 'remove-markdown'

const strip = (markdown: string): string => {
  return removeMarkdown(markdown)
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .trim()
}

export default strip
