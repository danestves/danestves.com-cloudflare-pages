// Dependencies
import { FiHome, FiFileText, FiGitPullRequest, FiBriefcase, FiEdit3, FiMail } from 'react-icons/fi'

// Components
import MenuItem from './MenuItem'

const items = [
  {
    icon: FiHome,
    label: 'Inicio',
    slug: '/',
  },
  {
    icon: FiFileText,
    label: 'Sobre Mí',
    slug: '/sobre-mi',
  },
  {
    icon: FiGitPullRequest,
    label: 'Open Source',
    slug: '/open-source',
  },
  {
    icon: FiBriefcase,
    label: 'Portafolio',
    slug: '/portafolio',
  },
  {
    icon: FiEdit3,
    label: 'Blog',
    slug: '/blog',
  },
  {
    icon: FiMail,
    label: 'Contacto',
    slug: '/contacto',
  },
]

const Navigation = ({ toggle }: { toggle: (arg0: boolean) => void }): JSX.Element => (
  <ul className="absolute w-full p-6 top-24">
    {items.map((item, i) => (
      <MenuItem key={item.slug} i={i} toggle={() => toggle(false)} {...item} />
    ))}
  </ul>
)

export default Navigation
