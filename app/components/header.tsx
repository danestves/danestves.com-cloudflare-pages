// Dependencies
import * as React from 'react';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { NavLink } from 'remix';
import { route } from 'routes-gen';
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
    to: route('/about'),
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
    name: 'posts',
    to: route('/posts'),
  },
];

const MOBILE_LINKS: DLink[] = [
  {
    name: 'home',
    to: route('/'),
  },
  ...LINKS,
];

function Header() {
  const { y } = useWindowScroll();

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 z-20 w-full px-6 transition-all duration-200 lg:px-12',
        y >= 104 ? 'bg-white py-2 shadow dark:bg-[#292929]' : 'py-6'
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-6 lg:space-x-0">
          <Popover className="lg:hidden">
            <Popover.Button className="block rounded-md focus:outline-none focus:ring-4 focus:ring-secondary/50">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-auto w-[31px] text-secondary" />
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
                className="absolute inset-x-0 top-0 z-10 origin-top-left p-2 transition lg:hidden"
                focus
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <NavLink to="/">
                      <Logo className="h-8 w-auto" />
                    </NavLink>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
                        <span className="sr-only">Close menu</span>
                        <XIcon aria-hidden="true" className="h-6 w-6" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3">
                    {MOBILE_LINKS.map(({ name, to, ...link }) => {
                      if (to.toString().startsWith('http')) {
                        return (
                          <a
                            {...link}
                            className="block rounded-md py-2 px-3 text-base font-semibold uppercase text-[#989898] hover:text-primary"
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
                          className="block rounded-md py-2 px-3 text-base font-semibold uppercase text-[#989898] hover:text-primary"
                          key={uuid()}
                          to={to}
                        >
                          {name}
                        </NavLink>
                      );
                    })}
                  </div>

                  <div className="bg-gray-50 py-3 px-5">
                    <div className="mx-auto flex max-w-xs justify-between">
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
            className="hidden h-9 w-9 focus:rounded focus:outline-none focus:ring-4 focus:ring-secondary/50 lg:inline-block"
            to="/"
          >
            <span className="sr-only">@danestves</span>
            <Logo aria-hidden="true" className="h-9 w-9" />
          </NavLink>
        </div>

        <div className="flex lg:pl-24">
          <NavLink
            className="inline-block h-9 w-9 focus:rounded focus:outline-none focus:ring-4 focus:ring-secondary/50 lg:hidden"
            to="/"
          >
            <span className="sr-only">@danestves</span>
            <Logo aria-hidden="true" className="h-9 w-9" />
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
