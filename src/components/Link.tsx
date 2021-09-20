// Dependencies
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import type { LinkProps as LinkNextProps } from 'next/link'

// Internals
import { clsx } from '@/utils'

export type LinkProps = React.ComponentProps<'a'> &
  LinkNextProps & {
    activeClassName?: string
  }

export const Link: React.FC<LinkProps> = ({
  href,
  activeClassName,
  as,
  passHref,
  replace,
  scroll,
  shallow,
  locale,
  ...rest
}) => {
  const router = useRouter()

  if (href.startsWith('http')) {
    return <a {...rest} href={href} rel="noopener noreferrer" target="_blank" />
  }

  const isActive = router.pathname === href

  return (
    <NextLink
      as={as}
      href={href}
      locale={locale}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <a
        {...rest}
        aria-current={isActive ? 'page' : undefined}
        className={clsx(rest.className, isActive && activeClassName)}
      />
    </NextLink>
  )
}

export default Link
