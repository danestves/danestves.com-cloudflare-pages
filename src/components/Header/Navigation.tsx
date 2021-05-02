// Components
import MenuItem from './MenuItem'

const Navigation = ({
  toggle,
  items,
}: {
  toggle: (arg0: boolean) => void
  items: {
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element
    label: string
    slug: string
  }[]
}): JSX.Element => (
  <ul className="absolute w-full p-6 top-24">
    {items.map((item, i) => (
      <MenuItem i={i} key={item.slug} toggle={() => toggle(false)} {...item} />
    ))}
  </ul>
)

export default Navigation
