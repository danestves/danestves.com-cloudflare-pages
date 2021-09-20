// Dependencies
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'

export type SeoProps = Omit<
  NextSeoProps,
  'openGraph.title' | 'openGraph.description'
>

export const Seo = (props: SeoProps): JSX.Element => {
  const router = useRouter()

  const lang = router.locale === 'es' ? '/es' : ''
  const description = props.description || ''
  const title = props.title || ''

  return (
    <NextSeo
      {...props}
      openGraph={{
        ...props.openGraph,
        description,
        images: [
          {
            url: `https://cdn.flyyer.io/v2/danestves/_/_${lang}${router.asPath}`,
            alt: title,
            height: 630,
            width: 1200,
          },
        ],
        title,
      }}
    />
  )
}

export default Seo
