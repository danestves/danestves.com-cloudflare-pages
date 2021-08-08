// Dependencies
import { ExternalLinkIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'

// Internals
import CTA from '../../public/static/img/cta.jpg'
import { Link } from '@/components'
import type { MyLocale } from 'i18n'

export const CallToAction = (): JSX.Element => {
  const { t } = useI18n<MyLocale>()
  const { locale } = useRouter()

  return (
    <div className="relative bg-gray-800 dark:bg-secondary-800">
      <div className="h-56 bg-primary-600 sm:h-72 md:absolute md:left-0 md:w-1/2 md:h-full">
        <div className="flex h-full">
          <Image
            alt="Call to action image"
            className="w-full h-full mix-blend-multiply"
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            src={CTA}
          />
        </div>
      </div>
      <div className="relative py-12 px-4 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <div className="md:pl-10 md:ml-auto md:w-1/2">
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t('cta.title')}
          </p>
          <p className="mt-3 text-lg text-gray-300">{t('cta.summary')}</p>
          <div className="mt-8">
            <div className="inline-flex rounded-md shadow">
              <Link
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-gray-900 bg-white hover:bg-gray-50 rounded-md border border-transparent"
                href="/contacto"
                locale={locale}
              >
                {t('cta.button.label')}
                <ExternalLinkIcon
                  aria-hidden="true"
                  className="-mr-1 ml-3 w-5 h-5 text-gray-400"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
