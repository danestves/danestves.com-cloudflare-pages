// Dependencies
import Link, { LinkProps as LinkNextProps } from 'next/link'

type LinkProps = React.ComponentProps<'a'> & LinkNextProps

const CustomLink: React.FC<LinkProps> = ({
  href,
  as,
  passHref,
  replace,
  scroll,
  shallow,
  ...rest
}) => (
  <Link href={href} as={as} replace={replace} scroll={scroll} shallow={shallow} passHref={passHref}>
    <a {...rest} />
  </Link>
)

export default CustomLink
