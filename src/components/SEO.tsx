// Dependencies
import * as React from 'react'
import { NextSeo } from 'next-seo'

// Interfaces
import { Media } from '@/interfaces'

type SEOProps = {
  title: string
  description: string
  shareImage?: Media
  twitterCardType?: string
  twitterUsername?: string
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  shareImage,
  twitterCardType,
  twitterUsername,
}) => {
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
          images: Object.values(shareImage.formats).map((image) => {
            return {
              url: image.url,
              width: image.width,
              height: image.height,
            }
          }),
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
