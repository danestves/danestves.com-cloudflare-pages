// Dependencies
import * as React from 'react'
import {
  BriefcaseIcon,
  CodeIcon,
  HomeIcon,
  IdentificationIcon,
  MailIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { document } from 'browser-monads-ts'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useI18n } from 'next-rosetta'

// Internals
import { LanguageSwitcher } from '@/components'
import Navigation from './Navigation'
import MenuToggle from './MenuToggle'
import { Search } from '../Search'
import DarkModeToggle from './DarkModeToggle'
import { useClickOutside } from '@/hooks'
import type { MyLocale } from 'i18n'

const items = [
  {
    icon: HomeIcon,
    label: 'home',
    slug: '/',
  },
  {
    icon: IdentificationIcon,
    label: 'aboutMe',
    slug: '/sobre-mi',
  },
  {
    icon: CodeIcon,
    label: 'openSource',
    slug: '/github',
  },
  {
    icon: BriefcaseIcon,
    label: 'portfolio',
    slug: '/portafolio',
  },
  {
    icon: RssIcon,
    label: 'blog',
    slug: '/blog',
  },
  {
    icon: MailIcon,
    label: 'contact',
    slug: '/contacto',
  },
]

const MobileHeader = (): JSX.Element => {
  const [isOpen, toggleOpen] = React.useState(false)
  const containerRef = React.useRef(null)

  const router = useRouter()
  useClickOutside(containerRef, () => toggleOpen(false))

  React.useMemo(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  return (
    <div
      className={clsx(
        'overflow-hidden fixed top-0 right-0 z-[100] w-72 transition-all duration-300 md:hidden',
        isOpen ? 'h-screen' : 'h-20'
      )}
      ref={containerRef}
    >
      {!router.pathname.includes('/blog/[slug]') && (
        <div className="fixed top-3 left-6 z-50 py-1 bg-white dark:bg-secondary bg-opacity-70 dark:bg-opacity-60 rounded saturate-[180%] backdrop-filter backdrop-blur-[20px] md:hidden">
          <LanguageSwitcher />
        </div>
      )}

      <div
        className="absolute top-0 right-0 bottom-0 w-72 bg-white transition-all duration-300"
        style={{
          clipPath: `circle(${isOpen ? 1000 * 1.5 + 200 : 24}px at 248px 32px)`,
        }}
      />

      <Navigation items={items} toggle={toggleOpen} />

      <div className="absolute top-3 right-36 py-2 px-3 bg-white rounded-full">
        <DarkModeToggle />
      </div>

      <div className="flex absolute top-2 right-20 z-[100] justify-center items-center p-2 w-12 h-12 bg-white dark:bg-primary rounded-full focus:ring-2 focus:ring-primary focus:outline-none">
        <Search />
      </div>

      <MenuToggle isOpen={isOpen} toggle={toggleOpen} />
    </div>
  )
}

export default React.memo(MobileHeader)
