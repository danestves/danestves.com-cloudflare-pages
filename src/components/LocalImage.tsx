// Dependencies
import * as React from 'react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import type { HTMLMotionProps } from 'framer-motion'
import type { ImageProps as NextImageProps } from 'next/image'

const variants = {
  loading: {
    scale: 1.2,
    filter: 'blur(42px)',
  },
  loaded: {
    scale: 1,
    filter: 'blur(0px)',
  },
}

export type LocalImageProps = {
  /**
   * The props for the `<div>` element using `framer-motion`.
   */
  container?: HTMLMotionProps<'div'>
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
  const [loaded, setLoaded] = React.useState(false)

  return (
    <motion.div
      {...container}
      animate={loaded ? 'loaded' : 'loading'}
      initial="loading"
      style={{ originX: 0.5, originY: 0.5 }}
      transition={{ duration: 0.8 }}
      variants={variants}
    >
      <NextImage {...image} onLoadingComplete={() => setLoaded(true)} />
    </motion.div>
  )
}

export default LocalImage
