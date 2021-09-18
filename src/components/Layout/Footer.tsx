// Dependencies
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'

// Internals
import { Link, Logo } from '../'
import { FLOATING_MENU, MENU } from '@/constants'

export const Footer = (): JSX.Element => {
  const router = useRouter()

  return (
    <>
      {/* Left Link */}
      <div className="fixed z-10 hidden bottom-8 left-12 lg:block">
        <Link
          className="font-semibold uppercase text-primary"
          href={FLOATING_MENU.left.href}
          locale={router.locale}
        >
          {FLOATING_MENU.left.label}
        </Link>
      </div>

      {/* Right Link */}
      <div className="fixed z-10 hidden bottom-8 right-12 lg:block">
        <Link
          className="font-semibold uppercase text-primary"
          href={FLOATING_MENU.right.href}
          locale={router.locale}
        >
          {FLOATING_MENU.right.label[router.locale] ||
            FLOATING_MENU.right.label}{' '}
          <span aria-label="call me hand" role="img">
            🤙
          </span>
        </Link>
      </div>

      <footer className="w-full py-8 bg-white dark:bg-[#292929]">
        <div className="container flex flex-col justify-center space-y-8">
          <Link
            className="inline-block mx-auto h-9 w-9"
            href="/"
            locale={router.locale}
          >
            <span className="sr-only">@danestves</span>
            <Logo aria-hidden="true" className="h-9 w-9" />
          </Link>

          <ul className="flex flex-col items-center justify-center xs:flex-row xs:space-x-4">
            {MENU.map(({ label, ...item }) => (
              <li key={nanoid()}>
                <Link
                  {...item}
                  className="text-xs text-[#989898] uppercase font-semibold leading-3 hover:text-primary dark:text-[#B1B1B1]"
                  locale={router.locale}
                >
                  {label[router.locale] || label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-xs text-[#989898] text-center font-semibold leading-3 dark:text-[#B1B1B1]">
            © 2021 Daniel Esteves. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
