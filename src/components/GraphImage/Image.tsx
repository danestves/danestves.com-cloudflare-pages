/* eslint-disable @next/next/no-img-element */
export type ImageProps = React.ComponentPropsWithoutRef<'img'> & {
  opacity?: 0 | 1
  transitionDelay?: string
}

export const Image = ({
  alt,
  onLoad,
  opacity,
  transitionDelay,
  ...props
}: ImageProps): JSX.Element => {
  return (
    <img
      {...props}
      alt={alt}
      onLoad={onLoad}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transition: 'opacity 0.5s',
        transitionDelay,
        opacity,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  )
}

export default Image
