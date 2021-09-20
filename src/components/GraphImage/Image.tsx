// Internals
import { ImageElement } from './styles'

/* eslint-disable @next/next/no-img-element */
export type ImageProps = React.ComponentPropsWithoutRef<'img'> & {
  opacity?: 0 | 1
  transitionDelay?: string
}

export const Image = ({
  alt,
  onLoad = null,
  opacity,
  transitionDelay = '',
  ...props
}: ImageProps): JSX.Element => {
  return (
    <ImageElement
      {...props}
      alt={alt}
      css={{
        transitionDelay,
        opacity,
      }}
      onLoad={onLoad}
    />
  )
}

export default Image
