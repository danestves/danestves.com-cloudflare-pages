// Dependencies
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'

// Internals
import { Link } from '@/components'
import { LinkOutIcon } from '@/components/Icons'
import type { Locale } from 'i18n'

export const CallToAction = (): JSX.Element => {
  const router = useRouter()
  const { t } = useI18n<Locale>()

  return (
    <section className="container py-6" id="danestves-section-call-to-action">
      <div className="w-full max-w-[977px] p-8 mx-auto rounded-[20px] bg-primary backdrop-blur-lg">
        <h2 className="text-[26px] font-black text-center text-white uppercase">
          {t('sections.calltoaction.title')}
        </h2>
        <p
          className="mt-2 text-xl text-center text-white"
          dangerouslySetInnerHTML={{ __html: t('sections.calltoaction.text') }}
        />

        <div className="flex justify-center mt-8">
          <Link
            className="inline-flex items-center justify-center flex-wrap px-5 py-[10px] text-xl font-bold text-white rounded-2xl bg-[#00247D]"
            href="/contact"
            locale={router.locale}
          >
            <span className="text-center lg:text-left">
              {t('sections.calltoaction.button')}
            </span>
            <LinkOutIcon className="w-4 h-4 ml-2 -mr-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
