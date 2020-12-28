// Dependencies
import * as React from 'react'
import { motion } from 'framer-motion'
import { FiHome, FiFileText, FiGitPullRequest, FiBriefcase, FiEdit3, FiMail } from 'react-icons/fi'

// Components
import MenuItem from './MenuItem'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

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

const Navigation = ({ toggle }: { toggle: () => void }): JSX.Element => (
  <motion.ul variants={variants} className="absolute w-full p-6 top-24">
    {items.map((item, i) => (
      <MenuItem key={item.slug} i={i} toggle={toggle} {...item} />
    ))}
  </motion.ul>
)

export default Navigation
