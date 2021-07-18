// Dependencies
import { window } from 'browser-monads-ts'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'
import { DefaultSeo } from 'next-seo'
import { useCookie } from 'react-use'

// Internals
import { Header, Footer, CallToAction } from '@/components'

export const Layout: React.FC = ({ children }) => {
  const [consent, setConsent] = useCookie('cookie_consent')
  const router = useRouter()
  const { t } = useI18n()
  const title = t('defaultSeo.title')
  const description = t('defaultSeo.description')

  const acceptConsent = () => {
    setConsent('CONSENT_ACCEPTED', {
      expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
      sameSite: 'strict',
      secure: true,
    })

    window.gtag?.('consent', 'update', {
      ad_storage: 'granted',
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

      {consent !== 'CONSENT_ACCEPTED' && (
        <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="p-2 bg-white rounded-lg shadow-lg sm:p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 w-0">
                  <p className="ml-3 text-sm font-medium text-black">
                    This site uses cookies to provide you with a better user
                    experience. For more information, refer to our{' '}
                    <a
                      className="underline"
                      href="https://www.privacypolicies.com/live/b48840a3-6609-410d-8ae9-cf75a727ff6b"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Cookie Policy
                    </a>
                  </p>
                </div>
                <div className="flex-shrink-0 order-3 w-auto mt-2 sm:order-2 sm:mt-0">
                  <button
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-secondary hover:bg-secondary-400"
                    onClick={acceptConsent}
                    type="button"
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Layout
