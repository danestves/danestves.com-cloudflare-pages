// Internals
import { GitHubIcon, TwitterIcon, YoutubeIcon } from '@/components/Icons'
import type { LinkProps } from '@/components'

type MenuItem = LinkProps & {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  label: string | { en: string; es: string }
}

export const SOCIAL: MenuItem[] = [
  {
    href: '/twitter',
    icon: TwitterIcon,
    label: 'twitter',
    rel: 'noopener noreferrer',
    target: '_blank',
  },
  {
    href: '/youtube',
    icon: YoutubeIcon,
    label: 'youtube',
    rel: 'noopener noreferrer',
    target: '_blank',
  },
  {
    href: '/github',
    icon: GitHubIcon,
    label: 'github',
    rel: 'noopener noreferrer',
    target: '_blank',
  },
]
