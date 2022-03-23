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
    <aside className="fixed top-0 left-0 z-10 hidden h-full px-12 lg:block">
      <ul
        className="flex h-full rotate-180 flex-col items-center justify-center space-y-4"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        {LINKS.map(({ name, to, prefetch, ...link }) => {
          if (to.toString().startsWith('http')) {
            return (
              <li itemProp="name" key={uuid()}>
                <a
                  className="text-xs font-semibold uppercase leading-3 text-[#989898] vertical-rl dark:text-[#B1B1B1] dark:hover:text-primary"
                  href={to.toString()}
                  itemProp="url"
                  {...link}
                >
                  {name}
                </a>
              </li>
            );
          }

          return (
            <li itemProp="name" key={uuid()}>
              <NavLink
                {...link}
                className="text-xs font-semibold uppercase leading-3 text-[#989898] vertical-rl dark:text-[#B1B1B1] dark:hover:text-primary"
                itemProp="url"
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
          className="font-semibold uppercase text-secondary"
          to={route('/posts')}
        >
          posts
        </NavLink>
      </div>
    </aside>
  );
}

export { LeftSidebar };
