// Dependencies
import * as React from 'react'
import NextLink, { LinkProps as LinkNextProps } from 'next/link'
import Image from 'next/image'
import Tweet from 'react-tweet-embed'
import { CodePen, YouTube, CodeSandbox } from 'mdx-embed'

// Components
import Cloudinary from './Cloudinary'

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
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
        <a {...rest} />
      </NextLink>
    )
  }

  // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content
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
}

export default MDXComponents
