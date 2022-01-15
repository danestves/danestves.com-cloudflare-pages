// Dependencies
import * as React from 'react';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { NavLink } from 'remix';
import { v4 as uuid } from 'uuid';

// Internals
import { LanguageSwitcher } from './language-switcher';
import { Logo } from './logo';
import { ThemeSwitcher } from './theme-switcher';
import { useWindowScroll } from '../hooks/use-window-scroll';
import { MenuIcon } from './icons/menu-icon';
import { XIcon } from './icons/x-icon';
import type { DLink } from '~/types';

const LINKS: DLink[] = [
  {
    name: 'about me',
    to: '/about',
  },
  {
    name: 'open source',
    rel: 'noopener noreferrer',
    target: '_blank',
    to: 'https://github.com/danestves',
  },
  {
    name: 'resume',
    rel: 'noopener noreferrer',
    target: '_blank',
    to: 'https://read.cv/danestves',
  },
  {
    name: 'blog',
    to: '/posts',
  },
];

const MOBILE_LINKS: DLink[] = [
  {
    name: 'home',
    to: '/',
  },
  ...LINKS,
];

function Header() {
  const { y } = useWindowScroll();

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 z-20 px-6 w-full transition-all duration-200 lg:px-12',
        y >= 104 ? 'py-2 bg-white dark:bg-[#292929] shadow' : 'py-6'
      )}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-6 lg:space-x-0">
          <Popover className="lg:hidden">
            <Popover.Button className="block rounded-md focus:outline-none focus:ring-4 focus:ring-secondary/50">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="w-[31px] h-auto text-secondary" />
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
                className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-left lg:hidden"
                focus
              >
                <div className="overflow-hidden bg-white rounded-lg ring-1 ring-black shadow-md ring-opacity-5">
                  <div className="flex justify-between items-center px-5 pt-4">
                    <NavLink to="/">
                      <Logo className="w-auto h-8" />
                    </NavLink>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex justify-center items-center p-2 text-gray-400 hover:text-gray-500 bg-white hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
                        <span className="sr-only">Close menu</span>
                        <XIcon aria-hidden="true" className="w-6 h-6" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3">
                    {MOBILE_LINKS.map(({ name, to, ...link }) => {
                      if (to.toString().startsWith('http')) {
                        return (
                          <a
                            {...link}
                            className="block py-2 px-3 text-base font-semibold text-[#989898] hover:text-primary uppercase rounded-md"
                            href={to.toString()}
                            key={uuid()}
                          >
                            {name}
                          </a>
                        );
                      }

                      return (
                        <NavLink
                          {...link}
                          className="block py-2 px-3 text-base font-semibold text-[#989898] hover:text-primary uppercase rounded-md"
                          key={uuid()}
                          to={to}
                        >
                          {name}
                        </NavLink>
                      );
                    })}
                  </div>

                  <div className="py-3 px-5 bg-gray-50">
                    <div className="flex justify-between mx-auto max-w-xs">
                      {/* {SOCIAL.map(({ icon: Icon, label, ...item }) => (
                        <Link
                          {...item}
                          className="block px-3 py-2 text-base text-[#989898] font-semibold rounded-md uppercase hover:text-primary"
                          key={nanoid()}
                          locale={router.locale}
                          onClick={() =>
                            plausible("Clicked on social link", {
                              props: {
                                device: "mobile",
                                label: label[router.locale] || label,
                                locale: router.locale,
                              },
                            })
                          }
                        >
                          <span className="sr-only">
                            {label[router.locale] || label}
                          </span>
                          <Icon aria-hidden="true" className="w-6 h-6" />
                        </Link>
                      ))} */}
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <div className="block lg:hidden">
            <ThemeSwitcher />
          </div>

          <NavLink
            className="hidden w-9 h-9 focus:rounded focus:outline-none focus:ring-4 focus:ring-secondary/50 lg:inline-block"
            to="/"
          >
            <span className="sr-only">@danestves</span>
            <Logo aria-hidden="true" className="w-9 h-9" />
          </NavLink>
        </div>

        <div className="flex lg:pl-24">
          <NavLink
            className="inline-block w-9 h-9 focus:rounded focus:outline-none focus:ring-4 focus:ring-secondary/50 lg:hidden"
            to="/"
          >
            <span className="sr-only">@danestves</span>
            <Logo aria-hidden="true" className="w-9 h-9" />
          </NavLink>

          {/* We put a padding left to simulate that in desktop is centered */}
          <div className="hidden lg:block">
            <ThemeSwitcher />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="block lg:hidden">{/* <Search /> */}</div>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export { Header };
