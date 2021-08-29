// Dependencies
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { usePlausible } from 'next-plausible'
import { useWindowScroll } from 'react-use'

// Internals
import {
  LanguageSwitcher,
  Link,
  LocalImage,
  Search,
  ThemeSwitcher,
} from '@/components'
import { MenuIcon } from '@/components/Icons'
import { MENU, SOCIAL } from '@/constants'
import { clsx } from '@/utils'
import AssetLogo from 'public/static/favicon.png'

export const Header = (): JSX.Element => {
  const router = useRouter()
  const plausible = usePlausible()
  const { y } = useWindowScroll()

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 w-full px-6 transition-all duration-200 z-20 lg:px-12',
          y >= 104 ? 'bg-white shadow py-2' : 'py-6'
        )}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-6">
            <button
              className="block rounded-md focus:outline focus:ring-4 focus:ring-secondary focus:ring-opacity-50 focus:outline-none lg:hidden"
              type="button"
            >
              <MenuIcon className="h-auto text-secondary w-[31px]" />
            </button>

            <div className="block lg:hidden">
              <ThemeSwitcher />
            </div>

            <Link
              className="hidden w-9 h-9 focus:outline-none focus:rounded focus:ring-4 focus:ring-secondary focus:ring-opacity-50 lg:inline-block"
              href="/"
              locale={router.locale}
            >
              <LocalImage
                image={{
                  alt: '@danestves',
                  placeholder: 'blur',
                  priority: true,
                  src: AssetLogo,
                }}
              />
            </Link>
          </div>

          <div className="flex lg:pl-20">
            <Link
              className="inline-block w-9 h-9 focus:outline-none focus:rounded focus:ring-4 focus:ring-secondary focus:ring-opacity-50 lg:hidden"
              href="/"
              locale={router.locale}
            >
              <LocalImage
                container={{
                  className: 'inline-flex',
                }}
                image={{
                  alt: '@danestves',
                  placeholder: 'blur',
                  priority: true,
                  src: AssetLogo,
                }}
              />
            </Link>

            {/* We put a padding left to simulate that in desktop is centered */}
            <div className="hidden lg:block">
              <ThemeSwitcher />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="block lg:hidden">
              <Search />
            </div>

            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside className="fixed top-0 left-0 z-10 hidden h-full px-12 lg:block">
        <ul className="flex flex-col items-center justify-center h-full space-y-4 rotate-180">
          {MENU.map((item) => (
            <li key={nanoid()}>
              <Link
                className="text-[10px] text-[#989898] uppercase font-semibold leading-3 vertical-rl hover:text-primary"
                href={item.href}
                locale={router.locale}
              >
                {item.label[router.locale] || item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Sidebar */}
      <aside className="fixed top-0 right-0 z-10 hidden h-full px-12 lg:block">
        <ul className="flex flex-col items-center justify-center h-full space-y-4 rotate-180">
          {SOCIAL.map((item) => (
            <li key={nanoid()}>
              <Link
                className="text-[10px] text-[#989898] uppercase font-semibold leading-3 vertical-rl hover:text-primary"
                href={item.href}
                locale={router.locale}
                onClick={() => plausible(item.label)}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.label[router.locale] || item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}

export default Header
