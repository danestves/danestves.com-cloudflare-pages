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
    <aside className="hidden fixed top-0 right-0 z-10 px-12 h-full lg:block">
      <ul className="flex flex-col justify-center items-center space-y-4 h-full rotate-180">
        {LINKS.map(({ name, ...link }) => (
          <li key={uuid()}>
            <a
              {...link}
              className="text-xs font-semibold leading-3 text-[#989898] hover:text-primary dark:text-[#B1B1B1] uppercase vertical-rl"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>

      <div className="fixed right-12 bottom-8 z-10">
        <a
          className="font-semibold text-primary uppercase"
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
