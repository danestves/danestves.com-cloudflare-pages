// Dependencies
import { v4 as uuid } from 'uuid';

const LINKS = [
  {
    name: 'twitter',
    rel: 'noopener noreferrer',
    target: '_blank',
    href: 'https://twitter.com/danestves',
  },
  {
    name: 'youtube',
    rel: 'noopener noreferrer',
    target: '_blank',
    href: 'https://www.youtube.com/channel/UC6YYVDKZC3mu1iB8IOCFqcw',
  },
  {
    name: 'github',
    rel: 'noopener noreferrer',
    target: '_blank',
    href: 'https://github.com/danestves',
  },
];

function RightSidebar() {
  return (
    <aside className="fixed top-0 right-0 z-10 hidden h-full px-12 lg:block">
      <ul className="flex h-full rotate-180 flex-col items-center justify-center space-y-4">
        {LINKS.map(({ name, ...link }) => (
          <li key={uuid()}>
            <a
              {...link}
              className="text-xs font-semibold uppercase leading-3 text-[#989898] vertical-rl hover:text-primary dark:text-[#B1B1B1] dark:hover:text-primary"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>

      <div className="fixed right-12 bottom-8 z-10">
        <a
          className="font-semibold uppercase text-secondary"
          href="https://twitter.com/messages/compose?recipient_id=554765148"
          rel="noopener noreferrer"
          target="_blank"
        >
          contact{' '}
          <span aria-label="call me hand" role="img">
            🤙
          </span>
        </a>
      </div>
    </aside>
  );
}

export { RightSidebar };
