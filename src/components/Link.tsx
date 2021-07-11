// Dependencies
import NextLink from 'next/link'
import type { LinkProps as LinkNextProps } from 'next/link'

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
    as={as}
    href={href}
    locale={locale}
    passHref={passHref}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
  >
    <a {...rest} />
  </NextLink>
)

export default Link
