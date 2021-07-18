// Dependencies
import { Flyyer } from '@flyyer/flyyer'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'
import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'

// Internals
import type { MyLocale } from 'i18n'

interface Props {
  title?: string
  isTemplate?: boolean
  description?: string
  shareImage?: string
  type?: string
  date?: string
  children?: React.ReactNode
}

export const SEO = ({
  isTemplate = true,
  type = 'website',
  ...props
}: Props & NextSeoProps): JSX.Element | null => {
  const router = useRouter()
  const { t } = useI18n<MyLocale>()

  let lang = ''
  switch (router.locale) {
    case 'en':
      lang = '/en'
      break
    default:
      break
  }

  const flayyer = new Flyyer({
    project: 'danestves-com',
    path: lang + router.asPath,
  })

  const title = props.title ? props.title : t('defaultSeo.title')
  const parsedTitle = isTemplate
    ? '%s | @danestves'.replace('%s', title)
    : title
  const description = props.description
    ? props.description
    : t('defaultSeo.description')
  const shareImage = props.shareImage ? props.shareImage : flayyer.href()

  return (
    <NextSeo
      canonical={`https://danestves.com${lang}${router.asPath}`}
      description={description}
      openGraph={{
        url: `https://danestves.com${lang}${router.asPath}`,
        title: parsedTitle,
        description,
        images: [{ url: shareImage }],
        site_name: parsedTitle,
        type,
        locale: router.locale,
      }}
      title={parsedTitle}
      twitter={{
        handle: '@danestves',
        site: '@danestves',
        cardType: 'summary_large_image',
      }}
      {...props}
    />
  )
}

export default SEO
