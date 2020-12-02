// Dependencies
import * as React from 'react'
import { NextSeo } from 'next-seo'

// Interfaces
import { Media } from '@/interfaces'

type SEOProps = {
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
    />
  )
}

export default SEO
