// Internals
import { GitHubIcon, TwitterIcon, YoutubeIcon } from '@/components/Icons'
import type { LinkProps } from '@/components'

type MenuItem = LinkProps & {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  label: string | { en: string; es: string }
}

export const SOCIAL: MenuItem[] = [
  {
    href: 'https://twitter.com/danestves',
    icon: TwitterIcon,
    label: 'twitter',
    rel: 'noopener noreferrer',
    target: '_blank',
  },
  {
    href: 'https://www.youtube.com/channel/UC6YYVDKZC3mu1iB8IOCFqcw',
    icon: YoutubeIcon,
    label: 'youtube',
    rel: 'noopener noreferrer',
    target: '_blank',
  },
  {
    href: 'https://github.com/danestves',
    icon: GitHubIcon,
    label: 'github',
    rel: 'noopener noreferrer',
    target: '_blank',
  },
]
