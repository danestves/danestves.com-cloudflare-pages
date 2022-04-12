// Dependencies
import { NavLink } from '@remix-run/react';
import { route } from 'routes-gen';
import { v4 as uuid } from 'uuid';

// Internals
import { Logo } from './logo';
import type { DLink } from '~/types';

const LINKS: DLink[] = [
  {
    name: 'about me',
    to: route('/about'),
    prefetch: 'intent',
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
    prefetch: 'intent',
  },
];

function Footer() {
  return (
    <footer className="w-full py-8">
      <div className="container flex flex-col justify-center space-y-8">
        <NavLink className="mx-auto inline-block h-9 w-9" to={route('/')}>
          <span className="sr-only">@danestves</span>
          <Logo aria-hidden="true" className="h-9 w-9" />
        </NavLink>

        <ul className="flex flex-col items-center justify-center xs:flex-row xs:space-x-4">
          {LINKS.map(({ name, to, prefetch, ...link }) => {
            if (to.toString().startsWith('http')) {
              return (
                <li key={uuid()}>
                  <a
                    {...link}
                    className="text-xs font-semibold uppercase leading-3 text-[#989898] hover:text-primary dark:text-[#B1B1B1] dark:hover:text-primary"
                    href={to.toString()}
                  >
                    {name}
                  </a>
                </li>
              );
            }

            return (
              <li key={uuid()}>
                <NavLink
                  {...link}
                  className="text-xs font-semibold uppercase leading-3 text-[#989898] hover:text-primary dark:text-[#B1B1B1] dark:hover:text-primary"
                  prefetch={prefetch}
                  to={to}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <p className="text-center text-xs font-semibold leading-3 text-[#989898] dark:text-[#B1B1B1]">
          © 2021 Daniel Esteves. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export { Footer };
