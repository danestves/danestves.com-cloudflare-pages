// Internals
import type { LinkProps } from '@/components'

type MenuItem = LinkProps & {
  label: string | { en: string; es: string }
}

const formatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export const WHATSAPP_TEXT = `Hello Daniel, I want additional information about your development services.

*I'm writing you from your website.*

---

Hola Daniel, me gustaría saber más información sobre tus servicios de desarrollo web.

*Te escribo desde tu sitio web.*

${formatter.format(new Date())}`

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
    href: `https://wa.me/584123697600?text=${encodeURIComponent(
      WHATSAPP_TEXT
    )}`,
    label: {
      en: 'contact',
      es: 'contacto',
    },
  },
]
