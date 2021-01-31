// Dependencies
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

// Components
import { Link } from '@/components'

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const colors = ['#C3009B', '#8900C3', '#2700C3', '#003AC3', '#009BC3', '#00C389']
// const colors = ['#491207', '#49071D', '#49073E', '#330749', '#120749', '#071D49']

const MenuItem = ({
  icon: Icon,
  label,
  slug,
  i,
  toggle,
}: {
  icon: IconType
  label: string
  slug: string
  i: number
  toggle: () => void
}): JSX.Element => {
  const style = { border: `2px solid ${colors[i]}` }

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="mb-5"
      onClick={toggle}
    >
      <Link href={slug} className="flex items-center space-x-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-full" style={style}>
          <Icon className="w-6 h-6" style={{ color: colors[i] }} />
        </div>
        <span
          className="flex-1 inline-block px-2 py-1 text-sm rounded"
          style={{ ...style, color: colors[i] }}
        >
          {label}
        </span>
      </Link>
    </motion.li>
  )
}

export default MenuItem
