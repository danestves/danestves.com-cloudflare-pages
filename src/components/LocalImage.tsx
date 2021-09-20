// Dependencies
import * as React from 'react'
import NextImage from 'next/image'
import type { ImageProps as NextImageProps } from 'next/image'

export type LocalImageProps = {
  /**
   * The props for the `<div>` element.
   */
  container?: React.ComponentProps<'div'>
  /**
   * The props for the `<Image />` element using `next/image`.
   */
  image: NextImageProps
}

/**
 * This component is a wrapper for Next.js' `<Image>` component.
 *
 * It adds the `loading` and `loaded` states to the `<Image>` component.
 *
 * When the `loading` state is active, the `<Image>` component is scaled up
 * and the `loading` filter blur is applied.
 *
 * ```tsx
 * import MySourceImage from '../public/static/MySourceImage.jpg'
 *
 * const MyPage = () => (
 *   <div>
 *     <Image
 *       container={{
 *         className: 'h-auto max-w-[318px]'
 *       }}
 *       image={{
 *         alt: '@danestves',
 *         placeholder: 'blur',
 *         src: MySourceImage,
 *       }}
 *     />
 *   </div>
 * )
 * ```
 */
export const LocalImage = ({
  container,
  image,
}: LocalImageProps): JSX.Element => {
  return (
    <div {...container}>
      <NextImage {...image} />
    </div>
  )
}

export default LocalImage
