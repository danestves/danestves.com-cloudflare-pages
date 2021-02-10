// Dependencies
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import { useI18n } from 'next-rosetta'

// Locales
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

const SEO = ({
  isTemplate = true,
  type = 'website',
  date,
  children,
  ...props
}: Props): JSX.Element | null => {
  const router = useRouter()
  const { t } = useI18n<MyLocale>()

  const title = props.title ? props.title : t('defaultSeo.title')
  const parsedTitle = isTemplate ? '%s | @danestves'.replace('%s', title) : title
  const description = props.description ? props.description : t('defaultSeo.description')
  const shareImage = props.shareImage ? props.shareImage : t('defaultSeo.shareImage')

  return (
    <Head>
      <title>{parsedTitle}</title>
      <meta name="robots" content="follow, index" />
      <meta key="description" content={description} name="description" />
      <meta key="og:url" property="og:url" content={`https://danestves.com${router.asPath}`} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:site_name" property="og:site_name" content="Daniel Esteves" />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:title" property="og:title" content={parsedTitle} />
      <meta key="og:image" property="og:image" content={shareImage} />
      <meta key="og:image:type" property="og:image:type" content="image/jpeg" />
      <meta key="og:image:alt" property="og:image:alt" content={parsedTitle} />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content="@danestves" />
      <meta key="twitter:creator" name="twitter:creator" content="@danestves" />
      <meta key="twitter:title" name="twitter:title" content={parsedTitle} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={shareImage} />
      <meta key="twitter:image:alt" name="twitter:image:alt" content={parsedTitle} />
      {date && (
        <meta key="article:published_time" property="article:published_time" content={date} />
      )}
      <link key="canonical_link" rel="canonical" href={`https://danestves.com${router.asPath}`} />
      {children}
    </Head>
  )
}

export default SEO
