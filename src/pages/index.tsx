// Dependencies
import type { I18nProps } from 'next-rosetta'
import type { GetStaticProps } from 'next'

// Internals
import type { Locale } from 'i18n'

export const HomePage = (): JSX.Element => <div className="">Hello World</div>

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)

  return { props: { table } }
}

export default HomePage
