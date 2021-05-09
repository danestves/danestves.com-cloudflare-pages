// Dependencies
import { useEffect, memo } from 'react'
import { GetStaticProps, NextPage } from 'next'
import kwesforms from 'kwesforms'
import Image from 'next/image'
import { useI18n, I18nProps } from 'next-rosetta'
import { useRouter } from 'next/dist/client/router'

// Components
import { SEO } from '@/components'

// Locales
import type { MyLocale } from 'i18n'

const Contacto: NextPage = () => {
  const { t } = useI18n<MyLocale>()
  const { locale } = useRouter()

  useEffect(() => {
    kwesforms.init()
  }, [locale])

  return (
    <>
      <SEO description={t('contact.seo.description')} title={t('contact.seo.title')} />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            {t('contact.title')}
          </h1>
        </div>
      </section>

      <section className="container px-5">
        <div className="grid items-center max-w-lg gap-16 mx-auto my-16 lg:max-w-none lg:grid-cols-2 xl:my-32">
          <div>
            <h2 className="mb-4 text-3xl font-semibold text-gray-700 dark:text-white sm:text-4xl md:text-5xl">
              {t('contact.subtitle')} 🚀
            </h2>

            <p className="mb-4 text-gray-500 dark:text-white">{t('contact.summary')}</p>

            <ul className="my-8">
              <li className="flex items-center my-4 space-x-4">
                <span className="flex p-4 rounded-full" style={{ background: '#C3009B' }}>
                  <Image
                    alt={t('contact.steps.first')}
                    height={32}
                    src="/static/building.svg"
                    width={32}
                  />
                </span>
                <span className="text-gray-600 dark:text-white">{t('contact.steps.first')}</span>
              </li>
              <li className="flex items-center my-4 space-x-4">
                <span className="flex p-4 rounded-full" style={{ background: '#8900C3' }}>
                  <Image
                    alt={t('contact.steps.second')}
                    height={32}
                    src="/static/niche.svg"
                    width={32}
                  />
                </span>
                <span className="text-gray-600 dark:text-white">{t('contact.steps.second')}</span>
              </li>
              <li className="flex items-center my-4 space-x-4">
                <span className="flex p-4 rounded-full" style={{ background: '#2700C3' }}>
                  <Image
                    alt={t('contact.steps.third')}
                    height={32}
                    src="/static/design.svg"
                    width={32}
                  />
                </span>
                <span className="text-gray-600 dark:text-white">{t('contact.steps.third')}</span>
              </li>
              <li className="flex items-center my-4 space-x-4">
                <span className="flex p-4 rounded-full" style={{ background: '#003AC3' }}>
                  <Image
                    alt={t('contact.steps.fourth')}
                    height={32}
                    src="/static/palette.svg"
                    width={32}
                  />
                </span>
                <span className="text-gray-600 dark:text-white">{t('contact.steps.fourth')}</span>
              </li>
              <li className="flex items-center my-4 space-x-4">
                <span className="flex p-4 rounded-full" style={{ background: '#009BC3' }}>
                  <Image
                    alt={t('contact.steps.fifth')}
                    height={32}
                    src="/static/calendar.svg"
                    width={32}
                  />
                </span>
                <span className="text-gray-600 dark:text-white">{t('contact.steps.fifth')}</span>
              </li>
              <li className="flex items-center my-4 space-x-4">
                <span className="flex p-4 rounded-full" style={{ background: '#00C389' }}>
                  <Image
                    alt={t('contact.steps.sixth')}
                    height={32}
                    src="/static/computer.svg"
                    width={32}
                  />
                </span>
                <span className="text-gray-600 dark:text-white">{t('contact.steps.sixth')}</span>
              </li>
            </ul>
          </div>

          <div>
            <form
              action="https://kwes.io/api/foreign/forms/Mm2LUetuNurfSFDKUGRY"
              className="kwes-form"
              lang={locale}
              method="POST"
            >
              <div className="py-2">
                <label className="sr-only" htmlFor="name">
                  {t('contact.form.name.label')}
                </label>
                <input
                  className="w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded focus:outline-none focus:bg-white focus:shadow-outline"
                  id="name"
                  name="name"
                  placeholder={t('contact.form.name.label')}
                  required
                  type="name"
                />
              </div>

              <div className="py-2">
                <label className="sr-only" htmlFor="email">
                  {t('contact.form.email.label')}
                </label>
                <input
                  className="w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded focus:outline-none focus:bg-white focus:shadow-outline"
                  id="email"
                  name="email"
                  placeholder={t('contact.form.email.label')}
                  required
                  type="email"
                />
              </div>

              <div className="py-2">
                <label className="sr-only" htmlFor="subject">
                  {t('contact.form.subject.label')}
                </label>
                <input
                  className="w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded focus:outline-none focus:bg-white focus:shadow-outline"
                  id="subject"
                  name="subject"
                  placeholder={t('contact.form.subject.label')}
                  required
                  type="text"
                />
              </div>

              <div className="py-2">
                <label className="sr-only" htmlFor="message">
                  {t('contact.form.message.label')}
                </label>
                <textarea
                  className="w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded focus:outline-none focus:shadow-outline focus:bg-white"
                  id="message"
                  name="message"
                  placeholder={t('contact.form.message.label')}
                  required
                  rows={4}
                />
              </div>

              <div className="flex flex-wrap justify-end mt-4">
                <div className="w-full mt-3 md:w-1/2 md:pl-2 md:mt-0">
                  <button
                    className="block w-full py-3 font-bold text-white capitalize transition-all duration-200 border rounded bg-primary border-primary"
                    type="submit"
                  >
                    {t('contact.form.button.label')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (context) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)

  return {
    props: {
      table,
    },
  }
}

export default memo(Contacto)
