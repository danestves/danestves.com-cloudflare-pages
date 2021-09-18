// Dependencies
import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'

export type SeoProps = Omit<
  NextSeoProps,
  'openGraph.title' | 'openGraph.description'
>

export const Seo = (props: SeoProps): JSX.Element => {
  const title = props.title || ''
  const description = props.description || ''

  return (
    <NextSeo
      {...props}
      openGraph={{ ...props.openGraph, description, title }}
    />
  )
}

export default Seo
