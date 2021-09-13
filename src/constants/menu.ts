// Internals
import type { LinkProps } from '@/components'

type MenuItem = LinkProps & {
  label: string | { en: string; es: string }
}

export const MENU: MenuItem[] = [
  {
    href: '/about',
    label: {
      en: 'about me',
      es: 'sobre mi',
    },
  },
  {
    href: '/github',
    label: 'open source',
    rel: 'noopener noreferrer',
    target: '_blank',
  },
  {
    href: '/portfolio',
    label: {
      en: 'portfolio',
      es: 'portafolio',
    },
  },
  {
    href: '/posts',
    label: 'blog',
  },
  {
    href: '/contact',
    label: {
      en: 'contact',
      es: 'contacto',
    },
  },
]
