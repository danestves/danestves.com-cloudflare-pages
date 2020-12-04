// Dependencies
import remove from 'remove-markdown'

/**
 * @function removeMarkdown
 *
 * @param markdown - The markdown text to parse
 * @returns Parsed plain text
 */
const removeMarkdown = (markdown: string): string => {
  return (
    remove(markdown)
      // Delete all jump lines
      .replace(/(\r\n|\n|\r)/gm, ' ')
      // Delete double space
      .replace('  ', ' ')
      // Delete triple space
      .replace('   ', ' ')
      // Delete markdown quotes
      .replace(' > ', ' ')
      // Delete initial and ending spaces
      .trim()
  )
}

export default removeMarkdown
