// Dependencies
import * as React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import { window } from 'browser-monads'

interface SEOProps extends NextSeoProps {
  title: string
  description: string
  shareImage?: string
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
      {...props}
      title={title}
      description={description}
      openGraph={{
        // Title and description are mandatory
        title: title,
        description: description,
        url: window.location.href,
        // Only include OG image if we have it
        images: [
          {
            url: shareImage || 'https://danestves.com/og.png',
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }}
      // Only included Twitter data if we have it
      twitter={{
        site: '@danestves',
        cardType: 'summary_large_image',
        handle: '@danestves',
        ...(twitterCardType && { cardType: twitterCardType }),
        ...(twitterUsername && { cardType: twitterUsername }),
      }}
      additionalMetaTags={[
        {
          name: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:image',
          content: shareImage || 'https://danestves.com/og.png',
        },
        {
          name: 'twitter:image:alt',
          content: title,
        },
      ]}
      canonical={window.location.href}
    />
  )
}

export default SEO
