// Dependencies
import * as React from 'react'
import Head from 'next/head'

// Internals
import { ImageFit } from '@/generated/graphql'
import { Image } from './Image'
import type { GraphImageProps } from '@/types/graphcms'

if (typeof window !== 'undefined') {
  require('intersection-observer')
}

// Cache if we've intersected an image before so we don't have to wait for it
const imageCache: { [key: string]: boolean } = {}
const inImageCache = (handle: string, shouldCache?: boolean) => {
  if (imageCache[handle]) {
    return true
  }

  if (shouldCache) {
    imageCache[handle] = true
  }

  return false
}

// Add IntersectionObserver to component
const listeners: [Element, () => void][] = []
const getIO = () => {
  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        listeners.forEach((listener) => {
          if (listener[0] === entry.target) {
            // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              // when we intersect we cache the intersecting image for subsequent mounts
              observer.unobserve(listener[0])
              listener[1]()
            }
          }
        })
      })
    },
    {
      rootMargin: '400px',
    }
  )
}

const listenToIntersections = (element: Element, callback: () => void) => {
  listeners.push([element, callback])

  getIO().observe(element)
}

/**
 * Get background color for image given a background color
 * or a boolean to use the default background color
 */
const bgColor = (backgroundColor?: boolean | string) => {
  return typeof backgroundColor === 'boolean' ? 'lightgray' : backgroundColor
}

export type ResizeImageProps = {
  width: number
  height: number
  fit: ImageFit
}

/**
 * We always keep the resize transform to have matching sizes + aspect ratio
 *
 * If used with native height & width from GraphCMS it produces no transform
 */
const resizeImage = ({ width, height, fit }: ResizeImageProps) => {
  return `resize=w:${width},h:${height},fit:${fit}`
}

/**
 * Filestack supports serving modern formats (like WebP) for supported browsers.
 *
 * See: https://www.filestack.com/docs/api/processing/#auto-image-conversion
 */
const compressAndWebp = (webp?: boolean) => {
  return `${webp ? 'auto_image/' : ''}compress`
}

/**
 * Build the URL for the image given the base URL, resize, transforms, webp and handle
 */
const constructURL =
  (handle: string, withWebp: boolean, baseURI: string) =>
  (resize: string) =>
  (transforms: string[]) => {
    const url = [
      baseURI,
      resize,
      ...transforms,
      compressAndWebp(withWebp),
      handle,
    ].join('/')

    return url
  }

/**
 * Responsiveness transforms
 */
const responsiveSizes = (size: number) => [
  size / 4,
  size / 2,
  size,
  size * 1.5,
  size * 2,
  size * 3,
]

/**
 * Returns the widths for the image given the width and the max width
 */
const getWidths = (width: number, maxWidth: number) => {
  const sizes = responsiveSizes(maxWidth).filter((size) => size < width)

  /**
   * Add the original width to ensure the largest image possible
   * is available for small images.
   */
  const finalSizes = [...sizes, width]

  return finalSizes
}

/**
 * Return the srcset for the image given the base URI, the widths,
 * the fit and the transforms
 */
const srcSet = (
  srcBase: (props: string[]) => (transforms: string[]) => string,
  srcWidths: number[],
  fit: ImageFit,
  transforms: string[]
) => {
  return srcWidths
    .map(
      (width) =>
        `${srcBase([`resize=w:${Math.floor(width)},fit:${fit}`])(
          transforms
        )} ${Math.floor(width)}w`
    )
    .join(',\n')
}

/**
 * Return the sizes for the image given the max width
 */
const imgSizes = (maxWidth: number) => {
  return `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`
}

export const GraphImage: React.FC<GraphImageProps> = ({
  alt = '',
  backgroundColor = '',
  baseURI = 'https://media.graphcms.com',
  blurryPlaceholder = true,
  className = '',
  fadeIn = true,
  fit = ImageFit.Crop,
  maxWidth = 800,
  outerWrapperClassName = '',
  priority = false,
  style = {},
  title = '',
  transforms = [],
  withWebp = true,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [imgLoaded, setImgLoaded] = React.useState(false)
  const [IOSupported, setIOSupported] = React.useState(false)

  const seenBefore = inImageCache('')

  React.useEffect(() => {
    if (!seenBefore) {
      setIOSupported(true)
    }
  }, [seenBefore])

  const onImageLoaded = React.useCallback(() => {
    if (IOSupported) {
      setImgLoaded(true)

      inImageCache(props.image.handle, true)
    }

    if (props.onLoad) {
      props.onLoad()
    }
  }, [IOSupported, props])

  const handleRef = React.useCallback(
    (node: HTMLDivElement) => {
      if (IOSupported && node) {
        listenToIntersections(node, () => {
          setIsVisible(true)
        })
      }
    },
    [IOSupported]
  )

  const {
    image: { width, height, handle },
  } = props

  if (!width && !height && !handle) {
    return null
  }

  // unify after webp + blur resolved
  const srcBase = constructURL(handle, withWebp, baseURI)
  const thumbBase = constructURL(handle, false, baseURI)

  // construct the final image url
  const sizedSrc = srcBase(resizeImage({ width, height, fit }))
  const finalSrc = sizedSrc(transforms)

  // construct blurry placeholder url
  const thumbSize = { width: 20, height: 20, fit: ImageFit.Crop }
  const thumbSrc = thumbBase(resizeImage(thumbSize))(['blur=amount:2'])

  // construct srcSet if maxWidth provided
  const srcSetImgs = srcSet(
    srcBase as any,
    getWidths(width, maxWidth),
    fit,
    transforms
  )
  const sizes = imgSizes(maxWidth)

  return (
    <>
      <div
        // The outer div is necessary to reset the z-index to 0.
        className={`${outerWrapperClassName} graphcms-image-outer-wrapper`}
        style={{
          zIndex: 0,
          // Let users set component to be absolutely positioned.
          position: style.position === 'absolute' ? 'initial' : 'relative',
        }}
      >
        <div
          className={`${className} graphcms-image-wrapper`}
          ref={handleRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
            ...style,
          }}
        >
          {/* Preserve the aspect ratio. */}
          <div
            style={{
              width: '100%',
              paddingBottom: `${100 / (width / height)}%`,
            }}
          />

          {/* Show the blurry thumbnail image. */}
          {blurryPlaceholder && (
            <Image
              alt={alt}
              opacity={imgLoaded ? 0 : 1}
              src={thumbSrc}
              title={title}
              transitionDelay="0.25s"
            />
          )}

          {/* Show a solid background color. */}
          {backgroundColor && (
            <div
              style={{
                backgroundColor: bgColor(backgroundColor),
                position: 'absolute',
                top: 0,
                bottom: 0,
                opacity: imgLoaded ? 0 : 1,
                transitionDelay: '0.25s',
                right: 0,
                left: 0,
              }}
              title={title}
            />
          )}

          {/* Once the image is visible, start downloading the image */}
          {isVisible && (
            <Image
              alt={alt}
              onLoad={onImageLoaded}
              opacity={imgLoaded || !fadeIn ? 1 : 0}
              sizes={sizes}
              src={finalSrc}
              srcSet={srcSetImgs}
              title={title}
            />
          )}
        </div>
      </div>

      {priority ? (
        // Note how we omit the `href` attribute, as it would only be relevant
        // for browsers that do not support `imagesrcset`, and in those cases
        // it would likely cause the incorrect image to be preloaded.
        //
        // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
        <Head>
          <link
            as="image"
            href={srcSetImgs ? undefined : finalSrc}
            // @ts-ignore: imagesizes is not yet in the link element type.
            imagesizes={sizes}
            // @ts-ignore: imagesrcset is not yet in the link element type.
            imagesrcset={srcSetImgs}
            key={'__graphcms-img-' + finalSrc + srcSetImgs + sizes}
            rel="preload"
          ></link>
        </Head>
      ) : null}
    </>
  )
}
