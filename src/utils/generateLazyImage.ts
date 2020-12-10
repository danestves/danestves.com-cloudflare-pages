// Dependencies
import got from 'got'
import sharp from 'sharp'

sharp.cache(false)

export async function generateLazyImage(
  src: string
): Promise<{ src: string; aspectRatio: number; lqip: string }> {
  const { body } = await got(src, { responseType: 'buffer' })
  const sharpImage = sharp(body)
  const { width, height, format } = await sharpImage.metadata()
  const lqipBuf = await sharpImage.resize({ width: 30, height: 30, fit: 'inside' }).toBuffer()

  console.log({ width, height })
  return {
    src,
    aspectRatio: (width || 2) / (height || 3),
    lqip: `data:image/${format};base64,${lqipBuf.toString('base64')}`,
  }
}
