// Dependencies
import GraphCmsImage from '@graphcms/react-image'
import { CodePen, YouTube, CodeSandbox, Tweet } from 'mdx-embed'
import Image from 'next/image'
import type { LinkProps as LinkNextProps } from 'next/link'

// Internals
import { Alert } from './Alert'
import Cloudinary from './Cloudinary'
import CodeBlock from './CodeBlock'
import Giphy from './Giphy'
import NextLink from './Link'

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

  return <a href={href} rel="noopener noreferrer" target="_blank" {...rest} />
}

const MDXComponents = {
  Image,
  a: CustomLink,
  Tweet,
  CodePen,
  YouTube,
  CodeSandbox,
  Cloudinary,
  Giphy,
  AlertInfo: Alert.Info,
  GraphCmsImage,
  code: CodeBlock,
}

export default MDXComponents
