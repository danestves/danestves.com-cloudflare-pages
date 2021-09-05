// Dependencies
import * as React from 'react'
import Head from 'next/head'

// Internals
import { GraphImageProps } from '@/types/graphcms'
import { Image } from './Image'
import { ImageFit } from '@/generated/graphql'

if (typeof window !== 'undefined') {
  require('intersection-observer')
}

/**
 * Cache if we've intersected an image before so we don't
 * lazy-load & fade in on subsequent mounts.
 */
const imageCache = {}
const inImageCache = (
  { handle }: GraphImageProps['image'],
  shouldCache?: boolean
) => {
  if (imageCache[handle]) {
    return true
  }

  if (shouldCache) {
    imageCache[handle] = true
  }

  return false
}

/**
 * Add IntersectionObserver to component
 */
const listeners = []
let io: IntersectionObserver
const getIO = () => {
  if (typeof io === 'undefined' && typeof window !== 'undefined') {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          listeners.forEach((listener) => {
            if (listener[0] === entry.target) {
              // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                // when we intersect we cache the intersecting image for subsequent mounts
                io.unobserve(listener[0])
                listener[1]()
              }
            }
          })
        })
      },
      { rootMargin: '200px' }
    )
  }

  return io
}

const listenToIntersections = (element: Element, callback: () => void) => {
  getIO().observe(element)
  listeners.push([element, callback])
}

const bgColor = (backgroundColor?: boolean | string) =>
  typeof backgroundColor === 'boolean' ? 'lightgray' : backgroundColor

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
const resizeImage = ({ width, height, fit }: ResizeImageProps) =>
  `resize=w:${width},h:${height},fit:${fit}`

/**
 * Filestack supports serving modern formats (like WebP) for supported browsers.
 *
 * See: https://www.filestack.com/docs/api/processing/#auto-image-conversion
 */
const compressAndWebp = (webp?: boolean) =>
  `${webp ? 'auto_image/' : ''}compress`

const constructURL =
  (handle: string, withWebp: boolean, baseURI: string) =>
  (resize: string) =>
  (transforms: string[]) =>
    [baseURI, resize, ...transforms, compressAndWebp(withWebp), handle].join(
      '/'
    )

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

const getWidths = (width: number, maxWidth: number) => {
  const sizes = responsiveSizes(maxWidth).filter((size) => size < width)

  /**
   * Add the original width to ensure the largest image possible
   * is available for small images.
   */
  const finalSizes = [...sizes, width]

  return finalSizes
}

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

const imgSizes = (maxWidth: number) =>
  `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`

export class GraphImage extends React.Component<
  GraphImageProps,
  { isVisible: boolean; imgLoaded: boolean; IOSupported: boolean }
> {
  static defaultProps = {
    alt: '',
    backgroundColor: '',
    baseURI: 'https://media.graphcms.com',
    blurryPlaceholder: true,
    className: '',
    fadeIn: true,
    fit: ImageFit.Crop,
    maxWidth: 800,
    outerWrapperClassName: '',
    priority: false,
    style: {},
    title: '',
    transforms: [],
    withWebp: true,
  }

  constructor(props: GraphImageProps) {
    super(props)

    let isVisible = true
    let imgLoaded = true
    let IOSupported = false

    const seenBefore = inImageCache(props.image)

    if (
      !seenBefore &&
      typeof window !== 'undefined' &&
      window.IntersectionObserver
    ) {
      isVisible = false
      imgLoaded = false
      IOSupported = true
    }

    // Never render image while server rendering
    if (typeof window === 'undefined') {
      isVisible = false
      imgLoaded = false
    }

    this.state = {
      isVisible,
      imgLoaded,
      IOSupported,
    }

    this.handleRef = this.handleRef.bind(this)
    this.onImageLoaded = this.onImageLoaded.bind(this)
  }

  onImageLoaded(): void {
    if (this.state.IOSupported) {
      this.setState(
        () => ({
          imgLoaded: true,
        }),
        () => {
          inImageCache(this.props.image, true)
        }
      )
    }
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  handleRef(ref: HTMLImageElement | null): void {
    if (this.state.IOSupported && ref) {
      listenToIntersections(ref, () => {
        this.setState({ isVisible: true, imgLoaded: false })
      })
    }
  }

  render(): JSX.Element {
    const {
      alt,
      backgroundColor,
      baseURI,
      blurryPlaceholder,
      className,
      fadeIn,
      fit,
      image: { width, height, handle },
      maxWidth,
      priority,
      outerWrapperClassName,
      style,
      title,
      transforms,
      withWebp,
    } = this.props

    if (width && height && handle) {
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

      // The outer div is necessary to reset the z-index to 0.
      return (
        <>
          <div
            className={`${outerWrapperClassName} graphcms-image-outer-wrapper`}
            style={{
              zIndex: 0,
              // Let users set component to be absolutely positioned.
              position: style.position === 'absolute' ? 'initial' : 'relative',
            }}
          >
            <div
              className={`${className} graphcms-image-wrapper`}
              ref={this.handleRef}
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
                  opacity={this.state.imgLoaded ? 0 : 1}
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
                    opacity: this.state.imgLoaded ? 0 : 1,
                    transitionDelay: '0.25s',
                    right: 0,
                    left: 0,
                  }}
                  title={title}
                />
              )}

              {/* Once the image is visible, start downloading the image */}
              {this.state.isVisible && (
                <Image
                  alt={alt}
                  onLoad={this.onImageLoaded}
                  opacity={this.state.imgLoaded || !fadeIn ? 1 : 0}
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

    return null
  }
}
