// Internals
import MenuItem from './MenuItem'

const Navigation = ({
  toggle,
  items,
}: {
  toggle: (arg0: boolean) => void
  items: {
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
    label: string
    slug: string
  }[]
}): JSX.Element => (
  <ul className="absolute top-24 p-6 w-full">
    {items.map((item, i) => (
      <MenuItem i={i} key={item.slug} toggle={() => toggle(false)} {...item} />
    ))}
  </ul>
)

export default Navigation
