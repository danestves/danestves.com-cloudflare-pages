// Dependencies
import { useI18n } from 'next-rosetta'
import type { I18nProps } from 'next-rosetta'
import type { GetStaticProps, NextPage } from 'next'

// Internals
import { Seo } from '@/components'
import { OutlineDocumentDownload } from '@/components/Icons'
import { Hero } from '@/components/Sections'
import type { Locale } from 'i18n'

export const AboutMe: NextPage = () => {
  const { t } = useI18n<Locale>()

  return (
    <>
      <Seo
        description={t('pages.about.seo.description')}
        title={t('pages.about.seo.title')}
      />
      <Hero />
      <div className="container space-y-4 max-w-[977px]">
        <h1 className="text-[26px] text-secondary-darker font-black text-center uppercase dark:text-secondary">
          {t('pages.about.title')}{' '}
          <span aria-label="victory hand" role="img">
            ✌️
          </span>
        </h1>
        {t('pages.about.paragraphs').map((text, i) => (
          <p className="text-lg text-[#989898] dark:text-[#B1B1B1]" key={i}>
            {text}
          </p>
        ))}
        <div className="flex justify-center space-x-4">
          <a
            className="inline-flex items-center text-secondary-darker min-w-[100px] bg-transparent border border-primary rounded-md py-2 px-4 transition-colors duration-100 hover:bg-primary dark:text-[#B1B1B1] dark:hover:text-[#292929]"
            href="/danestves.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('pages.about.buttons.0')}
            <OutlineDocumentDownload className="inline w-5 h-auto ml-2 -mr-1" />
          </a>
          <a
            className="inline-flex items-center text-secondary-darker min-w-[100px] bg-primary rounded-md border border-transparent py-2 px-4 transition duration-100 hover:brightness-105 dark:text-[#292929]"
            download
            href="/danestves.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('pages.about.buttons.1')}
            <OutlineDocumentDownload className="inline w-5 h-auto ml-2 -mr-1" />
          </a>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)

  return {
    props: { table },
  }
}

export default AboutMe
