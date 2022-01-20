// Dependencies
import { NavLink } from 'remix';
import { route } from 'routes-gen';
import { v4 as uuid } from 'uuid';

// Internals
import type { DLink } from '~/types';

const LINKS: DLink[] = [
  {
    name: 'about me',
    to: '/about',
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

function LeftSidebar() {
  return (
    <aside className="hidden fixed top-0 left-0 z-10 px-12 h-full lg:block">
      <ul className="flex flex-col justify-center items-center space-y-4 h-full rotate-180">
        {LINKS.map(({ name, to, prefetch, ...link }) => {
          if (to.toString().startsWith('http')) {
            return (
              <li key={uuid()}>
                <a
                  className="text-xs font-semibold leading-3 text-[#989898] dark:text-[#B1B1B1] dark:hover:text-primary uppercase vertical-rl"
                  href={to.toString()}
                  {...link}
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
                className="text-xs font-semibold leading-3 text-[#989898] dark:text-[#B1B1B1] dark:hover:text-primary uppercase vertical-rl"
                prefetch={prefetch}
                to={to}
              >
                {name}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="fixed bottom-8 left-12 z-10">
        <NavLink
          className="font-semibold text-secondary uppercase"
          to={route('/posts')}
        >
          posts
        </NavLink>
      </div>
    </aside>
  );
}

export { LeftSidebar };
