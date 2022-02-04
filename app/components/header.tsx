// Dependencies
import * as React from 'react';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { NavLink } from 'remix';
import { route } from 'routes-gen';
import { v4 as uuid } from 'uuid';

// Internals
import { TwitterIcon } from './icons/twitter-icon';
import { YoutubeIcon } from './icons/youtube-icon';
import { GithubIcon } from './icons/github-icon';
import { LanguageSwitcher } from './language-switcher';
import { Logo } from './logo';
import { ThemeSwitcher } from './theme-switcher';
import { useWindowScroll } from '../hooks/use-window-scroll';
import { MenuIcon } from './icons/menu-icon';
import { XIcon } from './icons/x-icon';
import type { DLink } from '~/types';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

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
const SOCIAL_LINKS: DLink[] = [
  {
    name: 'twitter',
    rel: 'noopener noreferrer',
    target: '_blank',
    to: 'https://twitter.com/danestves',
    icon: TwitterIcon,
  },
  {
    name: 'youtube',
    rel: 'noopener noreferrer',
    target: '_blank',
    to: 'https://www.youtube.com/channel/UC6YYVDKZC3mu1iB8IOCFqcw',
    icon: YoutubeIcon,
  },
  {
    name: 'github',
    rel: 'noopener noreferrer',
    target: '_blank',
    to: 'https://github.com/danestves',
    icon: GitHubLogoIcon,
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
                className="absolute inset-x-0 top-0 z-10 origin-top-left bg-white/80 p-2 backdrop-blur-lg transition dark:bg-[#292929]/80 lg:hidden"
                focus
              >
                <div className="overflow-hidden rounded-lg  shadow-md ring-1 ring-black/10 dark:ring-white/10">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <NavLink to="/">
                      <Logo className="h-8 w-auto" />
                    </NavLink>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 ring-1 ring-black/10 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary dark:bg-[#292929] dark:text-gray-200 dark:ring-white/10">
                        <span className="sr-only">Close menu</span>
                        <XIcon aria-hidden="true" className="h-6 w-6" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3">
                    {MOBILE_LINKS.map(({ name, to, ...link }) => {
                      if (to.toString().startsWith('http')) {
                        return (
                          <Popover.Button
                            {...link}
                            as="a"
                            className="block rounded-md py-2 px-3 text-base font-semibold uppercase text-[#989898] hover:text-primary"
                            href={to.toString()}
                            key={uuid()}
                          >
                            {name}
                          </Popover.Button>
                        );
                      }

                      return (
                        <Popover.Button
                          {...link}
                          as={NavLink}
                          className="block rounded-md py-2 px-3 text-base font-semibold uppercase text-[#989898] hover:text-primary"
                          key={uuid()}
                          to={to}
                        >
                          {name}
                        </Popover.Button>
                      );
                    })}
                  </div>

                  <div className="bg-gray-50/20 py-3 px-5 dark:bg-[#191919]/20">
                    <div className="mx-auto flex max-w-xs justify-between">
                      {SOCIAL_LINKS.map(({ icon: Icon, name, to, ...item }) => (
                        <Popover.Button
                          {...item}
                          as="a"
                          className="block rounded-md px-3 py-2 text-base font-semibold uppercase text-[#989898] hover:text-primary"
                          href={to.toString()}
                          key={uuid()}
                        >
                          <span className="sr-only">{name}</span>
                          {Icon && (
                            <Icon
                              className={clsx(
                                'h-6 w-6',
                                name.includes('github') &&
                                  'text-[#333] dark:text-white'
                              )}
                            />
                          )}
                        </Popover.Button>
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
