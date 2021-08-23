// Dependencies
import Image from 'next/image'
import Router from 'next/router'

// Internals
import { LanguageSwitcher, Link, ThemeSwitcher } from '@/components'
import AssetLogo from 'public/static/favicon.png'

export const Header = (): JSX.Element => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full px-12 py-8">
        <div className="flex items-center justify-between w-full">
          <Link
            className="inline-block w-8 h-8 focus:outline-none focus:rounded focus:ring-4 focus:ring-secondary focus:ring-opacity-50"
            href="/"
            locale={Router.locale}
          >
            <Image alt="@danestves" placeholder="blur" src={AssetLogo} />
          </Link>

          <ThemeSwitcher />

          <LanguageSwitcher />
        </div>
      </header>
    </>
  )
}

export default Header
