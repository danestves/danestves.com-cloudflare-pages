// Dependencies
import { CodePen } from 'mdx-embed/dist/components/codepen'
import { CodeSandbox } from 'mdx-embed/dist/components/codesandbox'
import { Tweet } from 'mdx-embed/dist/components/twitter/tweet'
import { YouTube } from 'mdx-embed/dist/components/youtube'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import type { LinkProps as LinkNextProps } from 'next/link'

// Internals
import { Link as NextLink } from '../'
import { Pre } from './Pre'

const Cloudinary = dynamic(() => import('./Cloudinary'), {
  ssr: false,
})
const Giphy = dynamic(() => import('./Giphy'), {
  ssr: false,
})

export const CustomLink = ({
  href,
  ...rest
}: React.ComponentProps<'a'> & LinkNextProps): JSX.Element => {
  const newHref = href
  const isInternalLink = newHref && newHref.startsWith('/')
  const isHeaderLink = newHref && newHref.startsWith('#')

  if (isHeaderLink) {
    return <a {...rest} href={newHref} />
  }

  if (isInternalLink) {
    return <NextLink {...rest} href={newHref} />
  }

  return <a {...rest} href={href} rel="noopener noreferrer" target="_blank" />
}

const MDXComponents = {
  a: CustomLink,
  Cloudinary,
  CodePen,
  CodeSandbox,
  Giphy,
  Image,
  pre: Pre,
  Tweet,
  YouTube,
}

export default MDXComponents
