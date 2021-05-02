// Dependencies
import Image from 'next/image'
import { useI18n } from 'next-rosetta'

// Components
import { Link } from '@/components'

// Locales
import type { MyLocale } from 'i18n'

export const CallToAction = (): JSX.Element => {
  const { t } = useI18n<MyLocale>()

  return (
    <section className="container px-5">
      <div className="max-w-5xl mx-auto my-16 lg:my-32">
        <div className="flex flex-wrap items-center flex-1 w-full overflow-hidden rounded-lg bg-primary md:flex-no-wrap">
          <div className="w-full md:w-1/3 md:order-last">
            <Image
              src="/programming-animation.gif"
              alt={t('cta.gif.alt') as string}
              width={300}
              height={300}
            />
          </div>
          <div className="w-full px-4 pt-24 pb-8 md:p-12 md:w-2/3">
            <h2 className="mb-4 text-3xl font-bold text-black lg:mb-4 sm:text-4xl md:text-5xl">
              {t('cta.title')}
            </h2>
            <div className="mb-4 lg:mb-4">
              <p className="mb-4">{t('cta.summary')}</p>
            </div>
            <Link
              href="/contacto"
              className="inline-block px-6 py-3 text-gray-300 transition-all duration-150 transform bg-black rounded-lg hover:shadow-lg hover:-translate-y-1 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-primary focus:outline-none"
            >
              {t('cta.button.label')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
