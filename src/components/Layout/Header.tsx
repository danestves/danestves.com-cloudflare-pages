// Dependencies
import * as React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { usePlausible } from 'next-plausible'
import { useI18n } from 'next-rosetta'
import useWindowScroll from 'react-use/lib/useWindowScroll'

// Internals
import {
  LanguageSwitcher,
  Link,
  Logo,
  Search,
  ThemeSwitcher,
} from '@/components'
import { MenuIcon, XIcon } from '@/components/Icons'
import { MENU, SOCIAL } from '@/constants'
import { clsx } from '@/utils'
import type { Locale } from 'i18n'

export const Header = (): JSX.Element => {
  const router = useRouter()
  const plausible = usePlausible()
  const { t } = useI18n<Locale>()
  const { y } = useWindowScroll()

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 w-full px-6 transition-all duration-200 z-20 lg:px-12',
          y >= 104 ? 'bg-white shadow py-2' : 'py-6'
        )}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-6 lg:space-x-0">
            <Popover className="lg:hidden">
              <Popover.Button className="block rounded-md focus:outline focus:ring-4 focus:ring-secondary focus:ring-opacity-50 focus:outline-none">
                <span className="sr-only">
                  {t('components.layout.menu.toggle')}
                </span>
                <MenuIcon className="h-auto text-secondary w-[31px]" />
              </Popover.Button>

              <Transition
                as={React.Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-left transform md:hidden"
                  focus
                >
                  <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
                    <div className="flex items-center justify-between px-5 pt-4">
                      <Link href="/" locale={router.locale}>
                        <Logo className="w-auto h-8" />
                      </Link>
                      <div className="-mr-2">
                        <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
                          <span className="sr-only">
                            {t('components.layout.menu.toggle')}
                          </span>
                          <XIcon aria-hidden="true" className="w-6 h-6" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-3">
                      {MENU.map(({ label, ...item }) => (
                        <Link
                          {...item}
                          className="block px-3 py-2 text-base text-[#989898] font-semibold rounded-md uppercase hover:text-primary"
                          key={item.href}
                          locale={router.locale}
                        >
                          {label[router.locale] || label}
                        </Link>
                      ))}
                    </div>

                    <div className="px-5 py-3 bg-gray-50">
                      <div className="flex justify-between max-w-xs mx-auto">
                        {SOCIAL.map(({ label, ...item }) => (
                          <Link
                            {...item}
                            className="block px-3 py-2 text-base text-[#989898] font-semibold rounded-md uppercase hover:text-primary"
                            key={item.href}
                            locale={router.locale}
                          >
                            <span className="sr-only">
                              {label[router.locale] || label}
                            </span>
                            <item.icon aria-hidden="true" className="w-6 h-6" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <div className="block lg:hidden">
              <ThemeSwitcher />
            </div>

            <Link
              className="hidden w-9 h-9 focus:outline-none focus:rounded focus:ring-4 focus:ring-secondary focus:ring-opacity-50 lg:inline-block"
              href="/"
              locale={router.locale}
            >
              <span className="sr-only">@danestves</span>
              <Logo aria-hidden="true" className="w-9 h-9" />
            </Link>
          </div>

          <div className="flex lg:pl-24">
            <Link
              className="inline-block w-9 h-9 focus:outline-none focus:rounded focus:ring-4 focus:ring-secondary focus:ring-opacity-50 lg:hidden"
              href="/"
              locale={router.locale}
            >
              <span className="sr-only">@danestves</span>
              <Logo aria-hidden="true" className="w-9 h-9" />
            </Link>

            {/* We put a padding left to simulate that in desktop is centered */}
            <div className="hidden lg:block">
              <ThemeSwitcher />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="block lg:hidden">
              <Search />
            </div>

            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside className="fixed top-0 left-0 z-10 hidden h-full px-12 lg:block">
        <ul className="flex flex-col items-center justify-center h-full space-y-4 rotate-180">
          {MENU.map(({ label, ...item }) => (
            <li key={nanoid()}>
              <Link
                {...item}
                className="text-xs text-[#989898] uppercase font-semibold leading-3 vertical-rl hover:text-primary"
                locale={router.locale}
              >
                {label[router.locale] || label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Sidebar */}
      <aside className="fixed top-0 right-0 z-10 hidden h-full px-12 lg:block">
        <ul className="flex flex-col items-center justify-center h-full space-y-4 rotate-180">
          {SOCIAL.map(({ label, ...item }) => (
            <li key={nanoid()}>
              <Link
                {...item}
                className="text-xs text-[#989898] uppercase font-semibold leading-3 vertical-rl hover:text-primary"
                locale={router.locale}
                onClick={() => plausible(label[router.locale] || label)}
              >
                {label[router.locale] || label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}

export default Header
