// Dependencies
import { useRouter } from 'next/dist/client/router'
import { DefaultSeo } from 'next-seo'
import { useI18n } from 'next-rosetta'

// Components
import { Header, Footer, CallToAction } from '@/components'

const Layout: React.FC = ({ children }) => {
  const router = useRouter()
  const { t } = useI18n()
  const title = t('defaultSeo.title')
  const description = t('defaultSeo.description')
  const shareImage = t('defaultSeo.shareImage')

  let lang = ''
  switch (router.locale) {
    case 'en':
      lang = '/en'
      break
    default:
      break
  }

  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        canonical={`https://danestves.com${lang}${router.asPath}`}
        openGraph={{
          url: `https://danestves.com${lang}${router.asPath}`,
          title,
          description,
          images: [{ url: shareImage }],
          site_name: title,
          type: 'website',
        }}
        twitter={{
          handle: '@danestves',
          site: '@danestves',
          cardType: 'summary_large_image',
        }}
      />

      <Header />

      {children}

      {router.pathname !== '/contacto' && <CallToAction />}

      <Footer />
    </>
  )
}

export default Layout
