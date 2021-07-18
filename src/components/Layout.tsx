// Dependencies
import { window } from 'browser-monads-ts'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'
import { DefaultSeo } from 'next-seo'
import CookieConsent from 'react-cookie-consent'

// Internals
import { Header, Footer, CallToAction } from '@/components'

export const Layout: React.FC = ({ children }) => {
  const router = useRouter()
  const { t } = useI18n()
  const title = t('defaultSeo.title')
  const description = t('defaultSeo.description')

  const acceptConsent = () => {
    window.gtag?.('consent', 'update', {
      ad_storage: 'granted',
    })
  }

  const declineConsent = () => {
    window.gtag?.('consent', 'update', {
      ad_storage: 'denied',
    })
  }

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
        canonical={`https://danestves.com${lang}${router.asPath}`}
        description={description}
        openGraph={{
          url: `https://danestves.com${lang}${router.asPath}`,
          title,
          description,
          images: [
            {
              url: `https://cdn.flyyer.io/v2/danestves-com/_/_${lang}${router.asPath}`,
            },
          ],
          site_name: title,
          type: 'website',
        }}
        title={title}
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

      <CookieConsent
        buttonClasses="m-0 flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-secondary hover:bg-secondary-400"
        buttonText="Ok"
        buttonWrapperClasses="flex space-x-2 items-center"
        containerClasses="bg-white flex items-center space-x-2 p-2 sm:p-3"
        contentClasses="m-0"
        cookieName="cookie_consent"
        cookieSecurity
        declineButtonClasses="m-0 flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-red-500 hover:bg-red-400"
        declineButtonText="No"
        enableDeclineButton
        expires={365}
        location="bottom"
        onAccept={acceptConsent}
        onDecline={declineConsent}
        sameSite="strict"
      >
        <p className="ml-3 text-sm font-medium text-black">
          This site uses cookies to provide you with a better user experience.
          For more information, refer to our{' '}
          <a
            className="underline"
            href="https://www.privacypolicies.com/live/b48840a3-6609-410d-8ae9-cf75a727ff6b"
            rel="noopener noreferrer"
            target="_blank"
          >
            Cookie Policy
          </a>
        </p>
      </CookieConsent>
    </>
  )
}

export default Layout
