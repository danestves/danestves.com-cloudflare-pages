// Dependencies
import * as React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import { window } from 'browser-monads'

// Interfaces
import { Asset } from '@/interfaces'

interface SEOProps extends NextSeoProps {
  title: string
  description: string
  shareImage?:
    | {
        url: string
        width: number
        height: number
        alt: string
      }
    | Asset
  twitterCardType?: string
  twitterUsername?: string
}

const SEO = ({
  title,
  description,
  shareImage,
  twitterCardType,
  twitterUsername,
  ...props
}: SEOProps): JSX.Element | null => {
  // Prevent errors if no metadata was set
  if (!title || !description) return null

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        // Title and description are mandatory
        title: title,
        description: description,
        url: window.location.href,
        // Only include OG image if we have it
        ...(shareImage && {
          images: [
            {
              url: shareImage.url,
              width: shareImage.width,
              height: shareImage.height,
              alt: title,
            },
          ],
        }),
      }}
      // Only included Twitter data if we have it
      twitter={{
        ...(twitterCardType && { cardType: twitterCardType }),
        ...(twitterUsername && { cardType: twitterUsername }),
      }}
      canonical={window.location.href}
      {...props}
    />
  )
}

export default SEO
