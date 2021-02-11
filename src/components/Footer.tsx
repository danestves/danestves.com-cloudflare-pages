// Dependencies
import { useI18n } from 'next-rosetta'
import { useRouter } from 'next/dist/client/router'

// Components
import { Link } from '@/components'

// Locales
import type { MyLocale } from 'i18n'

const Footer = (): JSX.Element => {
  const { t } = useI18n<MyLocale>()
  const { locale } = useRouter()

  return (
    <footer className="pt-5 bg-secondary">
      <div className="container px-5">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <div className="grid col-span-12 gap-4 mb-auto md:col-span-5">
            <p className="text-2xl font-semibold text-white">Daniel Esteves</p>

            <div>
              <p className="mb-4 text-white">{t('footer.summary')}</p>
            </div>

            <div className="-mx-4">
              <div className="flex mx-4 space-x-6">
                <Link href="/github" locale={locale} title="GitHub" className="text-primary">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 480 512"
                    height={24}
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z" />
                  </svg>
                </Link>

                <Link href="/twitter" locale={locale} title="Twitter" className="text-primary">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 512 512"
                    height={24}
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                  </svg>
                </Link>

                <Link href="/youtube" locale={locale} title="YouTube" className="text-primary">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 576 512"
                    height={24}
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-2">
            <p className="mb-6 font-semibold text-white">Links</p>

            <ul className="grid gap-2">
              <li>
                <Link href="/" className="text-white hover:underline focus:outline-none">
                  {t('footer.menu.home')}
                </Link>
              </li>
              <li>
                <Link href="/sobre-mi" className="text-white hover:underline focus:outline-none">
                  {t('footer.menu.aboutMe')}
                </Link>
              </li>
              <li>
                <Link href="/open-source" className="text-white hover:underline focus:outline-none">
                  {t('footer.menu.openSource')}
                </Link>
              </li>
              <li>
                <Link href="/portafolio" className="text-white hover:underline focus:outline-none">
                  {t('footer.menu.portfolio')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:underline focus:outline-none">
                  {t('footer.menu.blog')}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-white hover:underline focus:outline-none">
                  {t('footer.menu.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-5">
            <p className="mb-6 font-semibold text-white">{t('footer.newsletter.title')}</p>

            <p className="mb-4 text-white">{t('footer.newsletter.summary')}</p>

            <form
              action="https://www.getrevue.co/profile/danestves/add_subscriber"
              method="post"
              className="flex flex-col items-start my-4 space-y-4 md:items-center md:flex-row md:space-y-0 md:space-x-4"
            >
              <div className="w-full md:flex-1 md:w-auto">
                <label htmlFor="member[email]" className="sr-only">
                  {t('footer.newsletter.form.label')}
                </label>
                <input
                  type="email"
                  name="member[email]"
                  id="member[email]"
                  placeholder={t('footer.newsletter.form.placeholder')}
                  className="block w-full px-4 py-2 mx-auto font-mono leading-5 text-white placeholder-opacity-50 bg-transparent border border-white rounded-lg md:flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-secondary bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none"
              >
                {t('footer.newsletter.form.button.label')} 👉
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full py-5 mt-8 bg-secondary-800">
        <div className="container px-5">
          <p className="font-mono text-sm text-center text-primary">
            Daniel Esteves © <span>{new Date().getFullYear()}</span> - {t('footer.copyright')}
            <span className="block mt-2 font-mono text-sm text-center text-primary">
              Designed by{` `}
              <a href="https://twitter.com/vibrawifi" target="_blank" rel="noopener noreferrer">
                <b>Vibra Wifi</b>
              </a>
              {` `}
              with
              {` `}
              <a href="https://twitter.com/vicman_ve" target="_blank" rel="noopener noreferrer">
                <b>Victor Velasquez</b>
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
