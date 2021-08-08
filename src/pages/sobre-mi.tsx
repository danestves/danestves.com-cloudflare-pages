// Dependencies
import { useI18n } from 'next-rosetta'
import type { I18nProps } from 'next-rosetta'
import type { GetStaticProps, NextPage } from 'next'

// Internals
import { SEO } from '@/components'
import type { MyLocale } from 'i18n'

interface Props {
  experience: {
    id: number
    title: string
    subtitle: string
    date: string
    content: string
  }[]
}

const AboutMe: NextPage<Props> = ({ experience }) => {
  const { t } = useI18n<MyLocale>()

  return (
    <>
      <SEO
        description={t('aboutMe.seo.description')}
        title={t('aboutMe.seo.title')}
      />

      {/* Hero */}
      <div className="bg-primary">
        <div className="max-w-4xl px-5 py-32 mx-auto">
          <h1 className="text-4xl font-bold leading-none text-secondary md:text-[5rem]">
            <span className="font-mono">{'<'}</span> {t('aboutMe.intro')}
            <br /> Daniel
            <br /> Esteves <span className="font-mono">{'/>'}</span>
          </h1>
        </div>
      </div>

      {/* Biography */}
      <div className="bg-secondary w-full py-16 text-white">
        <div className="container px-5">
          <p className="max-w-4xl px-5 mx-auto font-mono text-xl">
            {t('aboutMe.summary.p1')}
          </p>

          <p className="max-w-4xl px-5 mx-auto mt-8 font-mono text-xl">
            {t('aboutMe.summary.p2')}
          </p>

          <p className="max-w-4xl px-5 mx-auto mt-8 font-mono text-xl">
            {t('aboutMe.summary.p3')}
          </p>

          <p className="max-w-4xl px-5 mx-auto mt-8 font-mono text-xl text-right">
            - {t('aboutMe.summary.sign')} 👨‍💻
          </p>
        </div>
      </div>

      {/* Experience and Educations */}
      <div className="w-full px-5 py-12 bg-white">
        <h2 className="text-secondary text-3xl font-bold text-center">
          {t('aboutMe.experience.title')}
        </h2>

        <div className="divide-primary container mt-8 divide-y-2">
          {experience?.map((item) => (
            <div
              className="first:border-t-2 last:border-b-2 first:border-primary last:border-primary max-w-4xl mx-auto"
              key={item.id}
            >
              <div className="max-w-3xl py-6 mx-auto">
                <h3 className="text-secondary mb-3 font-mono text-2xl font-bold">
                  {item.title}
                </h3>
                <h4 className="text-secondary mb-3 font-mono text-lg font-semibold">
                  {item.subtitle} |{item.date}
                </h4>
                <p className="font-mono text-lg text-secondary text-opacity-[0.90]">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const experience = await import(`@/data/experience/${locale}.json`)

  return {
    props: {
      table,
      experience: JSON.parse(JSON.stringify(experience)).default,
    },
  }
}

export default AboutMe
