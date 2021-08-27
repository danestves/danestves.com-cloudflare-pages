// Dependencies
import type { I18nProps } from 'next-rosetta'
import type { GetStaticProps } from 'next'

// Internals
import { LocalImage, Rings } from '@/components'
import MeMaskD from 'public/static/me-mask-d.png'
import type { Locale } from 'i18n'

export const HomePage = (): JSX.Element => (
  <section className="relative" id="danestves-section-hero">
    <Rings className="mx-auto w-full h-auto max-w-[731px]" />
    <div className="absolute mt-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:mt-3">
      <LocalImage
        container={{
          className: 'h-auto max-w-[318px]',
        }}
        image={{
          alt: '@danestves',
          placeholder: 'blur',
          src: MeMaskD,
        }}
      />
    </div>
  </section>
)

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)

  return { props: { table } }
}

export default HomePage
