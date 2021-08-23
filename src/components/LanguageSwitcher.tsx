// Dependencies
import * as React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useI18n } from 'next-rosetta'
import Router from 'next/router'

// Internals
import { Flag, Link } from '@/components'
import type { Locale } from 'i18n'

export const LanguageSwitcher = (): JSX.Element => {
  const { t } = useI18n<Locale>()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center px-4 py-2 space-x-4 rounded-md focus:outline focus:ring-4 focus:ring-primary focus:ring-opacity-50 focus:outline-none">
          <div className="w-6 h-6 rounded-full">
            <Flag />
          </div>
          <span className="font-semibold uppercase text-primary">
            {t('header.switcher.lang')} 👋🏻
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg w-max ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <Link
              className="inline-flex items-center p-4 mx-auto space-x-4 transition-colors duration-200 group hover:bg-primary"
              href={Router.asPath}
              locale={Router.locale === 'en' ? 'es' : 'en'}
            >
              <div className="w-6 h-6 rounded-full">
                <Flag locale={Router.locale === 'en' ? 'es' : 'en'} />
              </div>
              <span className="font-semibold uppercase transition-colors duration-200 text-primary group-hover:text-white">
                {Router.locale === 'en' ? 'Hola' : 'Hello'} 👋🏻
              </span>
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default LanguageSwitcher
