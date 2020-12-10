// Dependencies
import * as React from 'react'
import clsx from 'clsx'

type ImageProps = {
  className?: string
  src: string
  alt: string
  lqip: string
  aspectRatio: number
}

const Image = ({ className, src, alt, lqip, aspectRatio = 2 / 3 }: ImageProps): JSX.Element => {
  // States
  const [loaded, setLoaded] = React.useState(false)

  // Refs
  const imgRef = React.useRef<HTMLImageElement>(null)

  // Effects
  React.useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true)
    }
  }, [])

  // Render
  return (
    <div className={clsx('relative overflow-hidden', className)}>
      <div style={{ paddingBottom: `${100 / aspectRatio}%` }} />

      <img
        src={lqip}
        alt={alt}
        className="absolute inset-0 object-cover object-center w-full h-full"
        aria-hidden="true"
      />

      <img
        loading="lazy"
        src={src}
        alt={alt}
        ref={imgRef}
        onLoad={() => setLoaded(true)}
        className={clsx(
          'absolute inset-0 object-cover object-center w-full h-full',
          'opacity-0 transition duration-1000',
          loaded && 'opacity-100'
        )}
      />
    </div>
  )
}

export default Image
