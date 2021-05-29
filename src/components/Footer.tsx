// Dependencies
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'

// @types
import { MyLocale } from 'i18n'

// Components
import { Link } from '@/components'

const navigation = {
  main: [
    {
      name: {
        en: 'RSS',
        es: 'RSS',
      },
      href: '/rss.xml',
    },
    {
      name: {
        en: 'About',
        es: 'Sobre mí',
      },
      href: '/sobre-mi',
    },
    {
      name: {
        en: 'Courses',
        es: 'Cursos',
      },
      href: '/cursos',
    },
    {
      name: {
        en: 'Blog',
        es: 'Blog',
      },
      href: '/blog',
    },
    {
      name: {
        en: 'Contact',
        es: 'Contacto',
      },
      href: '/contacto',
    },
    {
      name: {
        en: 'Sitemap',
        es: 'Sitemap',
      },
      href: '/sitemap.xml',
    },
  ],
  social: [
    {
      name: 'Twitter',
      href: '/twitter',
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '/youtube',
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg
          aria-hidden="true"
          data-icon="youtube"
          height="1em"
          viewBox="0 0 576 512"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '/github',
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            fillRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

export const Footer = (): JSX.Element => {
  const { locale } = useRouter()
  const { t } = useI18n<MyLocale>()

  return (
    <footer className="bg-white dark:bg-secondary-600">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <nav aria-label="Footer" className="flex flex-wrap justify-center -mx-5 -my-2">
          {navigation.main.map((item, i) => (
            <div className="px-5 py-2" key={i}>
              <Link
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400"
                href={item.href}
                locale={locale}
              >
                {/* @ts-ignore: you can filter with string */}
                {item.name[locale || 'en']}
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          {navigation.social.map((item) => (
            <Link className="text-gray-400 hover:text-gray-500" href={item.href} key={item.name}>
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="w-6 h-6" />
            </Link>
          ))}
        </div>
        <p className="mt-8 text-base text-center text-gray-400">
          &copy; {new Date().getFullYear()} Daniel Esteves. {t('footer.copyright')}.
        </p>
      </div>
    </footer>
  )
}

export default Footer
