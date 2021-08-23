// Dependencies
import { nanoid } from 'nanoid'
import Image from 'next/image'
import Router from 'next/router'

// Internals
import { Link } from '@/components'
import AssetLogo from 'public/static/favicon.png'

const menu = [
  {
    href: '/about',
    label: {
      en: 'about me',
      es: 'sobre mi',
    },
  },
  {
    href: '/github',
    label: 'open source',
  },
  {
    href: '/portfolio',
    label: 'portafolio',
  },
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/contact',
    label: {
      en: 'contact',
      es: 'contacto',
    },
  },
]

export const Footer = (): JSX.Element => {
  return (
    <>
      <div className="fixed bottom-8 left-12">
        <Link
          className="font-semibold uppercase text-primary"
          href="/blog"
          locale={Router.locale}
        >
          blog
        </Link>
      </div>

      <div className="fixed bottom-8 right-12">
        <Link
          className="font-semibold uppercase text-primary"
          href="/contact"
          locale={Router.locale}
        >
          contacto 🤙
        </Link>
      </div>

      <footer className="w-full py-8 bg-white">
        <div className="container flex flex-col justify-center space-y-8">
          <Link
            className="inline-block mx-auto h-9 w-9"
            href="/"
            locale={Router.locale}
          >
            <Image alt="@danestves" placeholder="blur" src={AssetLogo} />
          </Link>

          <ul className="flex flex-col items-center justify-center xs:flex-row xs:space-x-4">
            {menu.map((item) => (
              <li key={nanoid()}>
                <Link
                  className="text-[10px] text-[#989898] uppercase font-semibold leading-3 hover:text-primary"
                  href={item.href}
                  locale={Router.locale}
                >
                  {item.label[Router.locale] || item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-[10px] text-[#989898] text-center font-semibold leading-3">
            © 2021 Daniel Esteves. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
