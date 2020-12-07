// Interfaces
import { Tag } from '@/interfaces'

/**
 * @function imageGenerator
 *
 * @description
 * Generator of URL for open graph images
 *
 * @param title - The title to show in the image
 * @param tags - The tags to show in the image (optional)
 *
 * @returns String with the generated URL to show the image
 */
const imageGenerator = (title: string, tags?: Tag[]): string => {
  return `https://generator.opengraphimg.com/?title=${decodeURIComponent(
    decodeURIComponent(title)
  )}${
    tags ? `&tags=${tags?.map(({ name }) => name).join(`,`)}` : ''
  }&author=danestves&background=00C389FF&boxBackground=071D49FF&titleMargin=-mt-12&tagsSize=text-3xl&atSymbol=true&authorSize=text-3xl`
}

export default imageGenerator
