// Dependencies
import { useState, useRef, useMemo, memo } from 'react'
import clsx from 'clsx'
import { useI18n } from 'next-rosetta'
import { document } from 'browser-monads-ts'
import { useRouter } from 'next/dist/client/router'

// Components
import { LanguageSwitcher } from '@/components'
import Navigation from './Navigation'
import MenuToggle from './MenuToggle'
import { Search } from '../Search'
import DarkModeToggle from './DarkModeToggle'

// Hooks
import { useClickOutside } from '@/hooks'

// Locales
import type { MyLocale } from 'i18n'

const MobileHeader = (): JSX.Element => {
  const [isOpen, toggleOpen] = useState(false)
  const containerRef = useRef(null)

  const { t } = useI18n<MyLocale>()
  useClickOutside(containerRef, () => toggleOpen(false))
  const router = useRouter()

  useMemo(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const items = [
    {
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      label: t('header.menu.home'),
      slug: '/',
    },
    {
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      label: t('header.menu.aboutMe'),
      slug: '/sobre-mi',
    },
    {
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      label: t('header.menu.openSource'),
      slug: '/github',
    },
    {
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      label: t('header.menu.portfolio'),
      slug: '/portafolio',
    },
    {
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      label: t('header.menu.blog'),
      slug: '/blog',
    },
    {
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      label: t('header.menu.contact'),
      slug: '/contacto',
    },
  ]

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 overflow-hidden z-[100] w-72 transition-all duration-300 md:hidden',
        isOpen ? 'h-screen' : 'h-20'
      )}
      ref={containerRef}
    >
      {!router.pathname.includes('/blog/[slug]') && (
        <div className="fixed z-50 top-3 left-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-[20px] saturate-[180%] rounded py-1 dark:bg-secondary dark:bg-opacity-60 md:hidden">
          <LanguageSwitcher />
        </div>
      )}

      <div
        className="absolute top-0 bottom-0 right-0 transition-all duration-300 bg-white w-72"
        style={{
          clipPath: `circle(${isOpen ? 1000 * 1.5 + 200 : 24}px at 248px 32px)`,
        }}
      />

      <Navigation items={items} toggle={toggleOpen} />

      <div className="absolute px-3 py-2 bg-white rounded-full top-3 right-36">
        <DarkModeToggle />
      </div>

      <div className="absolute flex items-center justify-center w-12 h-12 p-2 bg-white rounded-full z-[100] top-2 right-20 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-primary">
        <Search />
      </div>

      <MenuToggle isOpen={isOpen} toggle={toggleOpen} />
    </div>
  )
}

export default memo(MobileHeader)
