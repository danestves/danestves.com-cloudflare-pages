// Dependencies
import NextLink, { LinkProps as LinkNextProps } from 'next/link'

type LinkProps = React.ComponentProps<'a'> & LinkNextProps

export const Link: React.FC<LinkProps> = ({
  href,
  as,
  passHref,
  replace,
  scroll,
  shallow,
  locale,
  ...rest
}) => (
  <NextLink
    href={href}
    as={as}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    passHref={passHref}
    locale={locale}
  >
    <a {...rest} />
  </NextLink>
)

export default Link
