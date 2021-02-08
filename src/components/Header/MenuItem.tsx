// Components
import { Link } from '@/components'

const colors = ['#C3009B', '#8900C3', '#2700C3', '#003AC3', '#009BC3', '#00C389']
// const colors = ['#491207', '#49071D', '#49073E', '#330749', '#120749', '#071D49']

const MenuItem = ({
  icon: Icon,
  label,
  slug,
  i,
  toggle,
}: {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
  label: string
  slug: string
  i: number
  toggle: () => void
}): JSX.Element => {
  const style = { border: `2px solid ${colors[i]}` }

  return (
    <li
      className="mb-5 transition-transform duration-150 transform hover:scale-105"
      onClick={toggle}
    >
      <Link href={slug} className="flex items-center space-x-5 focus:outline-none">
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
    </li>
  )
}

export default MenuItem
