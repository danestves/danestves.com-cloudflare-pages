// Dependencies
import { NavLink } from 'remix';
import { v4 as uuid } from 'uuid';

// Internals
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

function Footer() {
  return (
    <footer className="py-8 w-full">
      <div className="container flex flex-col justify-center space-y-8">
        <NavLink className="inline-block mx-auto w-9 h-9" to={'/'}>
          <span className="sr-only">@danestves</span>
          {/* <Logo aria-hidden="true" className="h-9 w-9" /> */}
        </NavLink>

        <ul className="flex flex-col justify-center items-center xs:flex-row xs:space-x-4">
          {LINKS.map(({ name, to, ...link }) => {
            if (to.toString().startsWith('http')) {
              return (
                <li key={uuid()}>
                  <a
                    {...link}
                    className="text-xs font-semibold leading-3 text-[#989898] hover:text-primary dark:text-[#B1B1B1] uppercase"
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
                  className="text-xs font-semibold leading-3 text-[#989898] hover:text-primary dark:text-[#B1B1B1] uppercase"
                  to={to}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <p className="text-xs font-semibold leading-3 text-center text-[#989898] dark:text-[#B1B1B1]">
          © 2021 Daniel Esteves. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export { Footer };
