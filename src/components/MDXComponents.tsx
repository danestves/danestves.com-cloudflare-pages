// Dependencies
import NextLink, { LinkProps as LinkNextProps } from 'next/link'
import Image from 'next/image'
import { CodePen, YouTube, CodeSandbox, Tweet } from 'mdx-embed'

// Components
import Cloudinary from './Cloudinary'
import Giphy from './Giphy'

const CustomLink = ({
  href,
  as,
  passHref,
  replace,
  scroll,
  shallow,
  ...rest
}: React.ComponentProps<'a'> & LinkNextProps): JSX.Element => {
  const newHref = href
  const isInternalLink = newHref && (newHref.startsWith('/') || newHref.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink
        href={newHref}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
      >
        <a {...rest} />
      </NextLink>
    )
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />
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
}

export default MDXComponents
