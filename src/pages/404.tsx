// Dependencies
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'
import type { I18nProps } from 'next-rosetta'
import type { GetStaticProps, NextLayoutPage } from 'next'

// Internals
import { Link, Seo } from '@/components'
import {
  OutlineBriefcaseIcon,
  OutlineChatAlt2Icon,
  OutlineChevronRightIcon,
  OutlineRssIcon,
  OutlineUserCircleIcon,
} from '@/components/Icons'
import Logo from 'public/static/logo.png'
import type { Locale } from 'i18n'

const links = [
  {
    description: {
      en: 'Learn more about me',
      es: 'Lee sobre mi y mi trabajo',
    },
    href: '/about',
    icon: OutlineUserCircleIcon,
    title: {
      en: 'About me',
      es: 'Sobre mi',
    },
  },
  {
    description: {
      en: 'See my work',
      es: 'Ve mi trabajo',
    },
    href: '/portfolio',
    icon: OutlineBriefcaseIcon,
    title: {
      en: 'Portfolio',
      es: 'Portafolio',
    },
  },
  {
    description: {
      en: 'Read my blog',
      es: 'Lee mi blog',
    },
    href: '/posts',
    icon: OutlineRssIcon,
    title: {
      en: 'Posts',
      es: 'Blog',
    },
  },
  {
    description: {
      en: 'Reach out me for any questions or feedback',
      es: 'Contacta conmigo para cualquier duda o comentario',
    },
    href: `https://wa.me/message/V2KA74PJTEEYP1`,
    icon: OutlineChatAlt2Icon,
    title: {
      en: 'Contact',
      es: 'Contacto',
    },
  },
]

const NotFoundPage: NextLayoutPage = () => {
  const router = useRouter()
  const { t } = useI18n<Locale>()

  return (
    <>
      <Seo
        description={t('pages.notFound.seo.description')}
        title={t('pages.notFound.seo.title')}
      />
      <div className="flex items-center min-h-screen">
        <main className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex-shrink-0 pt-16 sm:pt-16">
            <div className="w-12 h-auto mx-auto">
              <Image
                alt="@danestves"
                className="w-full h-full"
                placeholder="blur"
                priority
                src={Logo}
              />
            </div>
          </div>
          <div className="max-w-xl pt-8 pb-16 mx-auto sm:pt-12 sm:pb-24">
            <div className="text-center">
              <p className="text-sm font-semibold tracking-wide uppercase text-[#838383]">
                {t('pages.notFound.subtitle')}
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-secondary-darker dark:text-secondary sm:text-5xl">
                {t('pages.notFound.title')}
              </h1>
              <p className="mt-2 text-lg text-[#838383]">
                {t('pages.notFound.caption')}
              </p>
            </div>
            <div className="mt-12">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-secondary-darker dark:text-secondary">
                {t('pages.notFound.popular')}
              </h2>
              <ul
                className="mt-4 border-t border-b border-[#d3d3d3] divide-y divide-[#d3d3d3] dark:border-[#434343] dark:divide-[#434343]"
                role="list"
              >
                {links.map(({icon: Icon, ...link}, i) => (
                  <li
                    className="relative flex items-start py-6 space-x-4"
                    key={i}
                  >
                    <div className="flex-shrink-0">
                      <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary bg-opacity-20 dark:bg-opacity-10">
                        <Icon
                          aria-hidden="true"
                          className="w-6 h-6 text-secondary"
                        />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-secondary-darker dark:text-secondary">
                        <span className="rounded-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-secondary">
                          <Link
                            className="focus:outline-none"
                            href={link.href}
                            locale={router.locale}
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {link.title[router.locale]}
                          </Link>
                        </span>
                      </h3>
                      <p className="text-base text-[#838383]">
                        {link.description[router.locale]}
                      </p>
                    </div>
                    <div className="self-center flex-shrink-0">
                      <OutlineChevronRightIcon
                        aria-hidden="true"
                        className="w-5 h-5 text-[#838383]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  className="text-base font-semibold text-secondary hover:underline dark:hover:brightness-125 dark:text-secondary"
                  href="/"
                  locale={router.locale}
                >
                  {t('pages.notFound.cta')}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

NotFoundPage.getLayout = (page) => <>{page}</>

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async (
  ctx
) => {
  const locale = ctx.locale || ctx.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)

  return {
    props: { table },
  }
}

export default NotFoundPage
