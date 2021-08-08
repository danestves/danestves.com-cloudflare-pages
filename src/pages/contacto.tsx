// Dependencies
import * as React from 'react'
import kwesforms from 'kwesforms'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'
import type { I18nProps } from 'next-rosetta'
import type { GetStaticProps, NextPage } from 'next'

// Internals
import { SEO } from '@/components'
import type { MyLocale } from 'i18n'

const Contacto: NextPage = () => {
  const { t } = useI18n<MyLocale>()
  const { locale } = useRouter()

  React.useEffect(() => {
    kwesforms.init()
  }, [locale])

  return (
    <>
      <SEO
        description={t('contact.seo.description')}
        title={t('contact.seo.title')}
      />

      <section className="container">
        <div className="lg:w-3/4 xl:w-2/3 mx-auto my-20 text-center">
          <h1 className="dark:text-white sm:text-5xl md:text-6xl mb-10 text-4xl font-bold text-gray-900">
            {t('contact.title')}
          </h1>
        </div>
      </section>

      <section className="container px-5">
        <div className="lg:grid-cols-2 lg:max-w-none xl:my-32 grid items-center max-w-lg gap-16 mx-auto my-16">
          <div>
            <h2 className="dark:text-white sm:text-4xl md:text-5xl mb-4 text-3xl font-semibold text-gray-700">
              {t('contact.subtitle')} 🚀
            </h2>

            <p className="dark:text-white mb-4 text-gray-500">
              {t('contact.summary')}
            </p>

            <ul className="my-8">
              <li className="flex items-center my-4 space-x-4">
                <span
                  className="flex p-4 rounded-full"
                  style={{ background: '#C3009B' }}
                >
                  <Image
                    alt={t('contact.steps.first')}
                    height={32}
                    src="/static/building.svg"
                    width={32}
                  />
                </span>
                <span className="dark:text-white text-gray-600">
                  {t('contact.steps.first')}
                </span>
              </li>
              <li className="flex items-center my-4 space-x-4">
                <span
                  className="flex p-4 rounded-full"
                  style={{ background: '#8900C3' }}
                >
                  <Image
                    alt={t('contact.steps.second')}
                    height={32}
                    src="/static/niche.svg"
                    width={32}
                  />
                </span>
                <span className="dark:text-white text-gray-600">
                  {t('contact.steps.second')}
                </span>
              </li>
              <li className="flex items-center my-4 space-x-4">
                <span
                  className="flex p-4 rounded-full"
                  style={{ background: '#2700C3' }}
                >
                  <Image
                    alt={t('contact.steps.third')}
                    height={32}
                    src="/static/design.svg"
                    width={32}
                  />
                </span>
                <span className="dark:text-white text-gray-600">
                  {t('contact.steps.third')}
                </span>
              </li>
              <li className="flex items-center my-4 space-x-4">
                <span
                  className="flex p-4 rounded-full"
                  style={{ background: '#003AC3' }}
                >
                  <Image
                    alt={t('contact.steps.fourth')}
                    height={32}
                    src="/static/palette.svg"
                    width={32}
                  />
                </span>
                <span className="dark:text-white text-gray-600">
                  {t('contact.steps.fourth')}
                </span>
              </li>
              <li className="flex items-center my-4 space-x-4">
                <span
                  className="flex p-4 rounded-full"
                  style={{ background: '#009BC3' }}
                >
                  <Image
                    alt={t('contact.steps.fifth')}
                    height={32}
                    src="/static/calendar.svg"
                    width={32}
                  />
                </span>
                <span className="dark:text-white text-gray-600">
                  {t('contact.steps.fifth')}
                </span>
              </li>
              <li className="flex items-center my-4 space-x-4">
                <span
                  className="flex p-4 rounded-full"
                  style={{ background: '#00C389' }}
                >
                  <Image
                    alt={t('contact.steps.sixth')}
                    height={32}
                    src="/static/computer.svg"
                    width={32}
                  />
                </span>
                <span className="dark:text-white text-gray-600">
                  {t('contact.steps.sixth')}
                </span>
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
                  className="focus:bg-white focus:outline-none w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded"
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
                  className="focus:bg-white focus:outline-none w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded"
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
                  className="focus:bg-white focus:outline-none w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded"
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
                  className="focus:bg-white focus:outline-none w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded"
                  id="message"
                  name="message"
                  placeholder={t('contact.form.message.label')}
                  required
                  rows={4}
                />
              </div>

              <div className="flex flex-wrap justify-end mt-4">
                <div className="md:pl-2 md:mt-0 md:w-1/2 w-full mt-3">
                  <button
                    className="bg-primary border-primary block w-full py-3 font-bold text-white capitalize transition-all duration-200 border rounded"
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

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)

  return {
    props: {
      table,
    },
  }
}

export default React.memo(Contacto)
