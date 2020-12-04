// Dependencies
import * as React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import { window } from 'browser-monads'

// Interfaces
import { Media } from '@/interfaces'

interface SEOProps extends NextSeoProps {
  title: string
  description?: string
  shareImage?: Media
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
        // Only include OG image if we have it
        // Careful: if you disable image optimization in Strapi, this will break
        ...(shareImage && {
          images: shareImage.formats
            ? Object.values(shareImage.formats).map((image) => {
                return {
                  url: image.url,
                  width: image.width,
                  height: image.height,
                }
              })
            : [{ url: shareImage.url || '', width: 1000, height: 523 }],
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
