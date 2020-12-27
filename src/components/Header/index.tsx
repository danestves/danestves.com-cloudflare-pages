// Dependencies
import * as React from 'react'
import { Transition } from '@tailwindui/react'

// Components
import { Link } from '@/components'

type Props = {
  pathname: string
}

const Header = ({ pathname }: Props): JSX.Element => {
  // States
  const [isOpen, setIsOpen] = React.useState(false)

  // Render
  return (
    <>
      <header className="w-full">
        <div className="md:px-8">
          <nav className="container relative flex flex-wrap items-center justify-end">
            {pathname !== `/` && (
              <div className="relative flex-1 flex-shrink-0 py-4 pl-4 md:p-0">
                <Link href="/" title="Inicio">
                  <svg viewBox="0 0 1080 1080" className="w-8 h-8 text-primary">
                    <path
                      d="M1061.237 540.246c-.105 288.558-237.61 520.991-526.204 520.991H207.654A188.891 188.891 0 0118.763 872.346V705.883a23.728 23.728 0 0123.71-23.727h24.166a46.911 46.911 0 0146.894 46.929V872.24a94.209 94.209 0 0094.226 94.226h327.608c235.697 0 430.275-189.278 431.1-424.975C967.292 305.25 776.013 113.533 540 113.533H207.76a94.226 94.226 0 00-94.227 94.191v143.227a46.911 46.911 0 01-46.894 46.893H42.473a23.71 23.71 0 01-23.71-23.692V207.654A188.927 188.927 0 01207.654 18.763H540c287.944 0 521.36 233.416 521.237 521.483z"
                      id="prefix__path3982"
                      fill="currentColor"
                      strokeWidth={1.755}
                    />
                    <path
                      d="M871.696 542.527c-1.368 182.907-152.984 329.17-335.855 329.17H255.232a46.929 46.929 0 01-46.928-46.894V706.04a23.886 23.886 0 0123.868-23.885h46.77a24.114 24.114 0 0124.132 24.149v58.582a12.04 12.04 0 0012.04 12.039h221.885c130.625 0 238.927-104.458 239.927-235.066A236.926 236.926 0 00540 303.074H315.113a12.04 12.04 0 00-12.039 12.04v58.599a24.131 24.131 0 01-24.131 24.131h-46.771a23.903 23.903 0 01-23.868-23.85V255.232a46.946 46.946 0 0146.928-46.928H540c184.065 0 333.1 149.877 331.696 334.223z"
                      id="prefix__path3984"
                      fill="currentColor"
                      strokeWidth={1.755}
                    />
                    <path
                      d="M587.385 542.352c-1.228 25.482-23.201 45.033-48.701 45.033H42.332a23.552 23.552 0 01-23.57-23.534v-47.649a23.552 23.552 0 0123.57-23.587h497.651a47.385 47.385 0 0147.402 49.737z"
                      id="prefix__path3986"
                      fill="currentColor"
                      strokeWidth={1.755}
                    />
                  </svg>
                </Link>
              </div>
            )}

            <div className="flex-shrink-0 pr-4 md:hidden">
              <button
                type="button"
                aria-label="Menu"
                onClick={() => setIsOpen(!isOpen)}
                className="block my-5 text-primary focus:outline-none focus:text-primary"
              >
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
                  <path d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6Z" />
                  <path d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z" />
                  <path d="M4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H4Z" />
                </svg>
              </button>
            </div>

            <div className="hidden md:ml-10 md:flex md:items-baseline md:bg-transparent">
              <div className="flex items-center justify-center">
                <Link
                  href="/sobre-mi"
                  title="Sobre Mí"
                  className="relative px-3 text-sm font-medium transition-all duration-200 text-primary hover:text-white py-7 focus:outline-none"
                >
                  Sobre Mí
                </Link>
                <Link
                  href="/open-source"
                  title="Open Source"
                  className="px-3 text-sm font-medium transition-all duration-200 text-primary py-7 hover:text-white"
                >
                  Open Source
                </Link>
                <Link
                  href="/portafolio"
                  title="Portafolio"
                  className="px-3 text-sm font-medium transition-all duration-200 text-primary py-7 hover:text-white"
                >
                  Portafolio
                </Link>
                <Link
                  href="/blog"
                  title="Blog"
                  className="px-3 text-sm font-medium transition-all duration-200 text-primary py-7 hover:text-white"
                >
                  Blog
                </Link>
                <Link
                  href="/contacto"
                  title="Contacto"
                  className="px-3 text-sm font-medium transition-all duration-200 text-primary py-7 hover:text-white"
                >
                  Contacto
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="md:hidden">
        <Transition
          show={isOpen}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 z-100"
        >
          <div
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={() => setIsOpen(!isOpen)}
            className="absolute inset-0 bg-black opacity-50 z-100"
            tabIndex={-1}
            role="button"
          />
        </Transition>

        <Transition
          show={isOpen}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="fixed inset-y-0 right-0 w-full max-w-xs overflow-y-auto bg-white bg-opacity-50 z-100 backdrop-blur"
        >
          <div className="relative z-10">
            <div className="block p-4 text-right">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="block px-3 py-1 ml-auto text-secondary focus:outline-none focus:text-secondary"
                aria-label="Close"
              >
                <svg className="w-6 h-6 fill-current" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L13.4142 12L19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L12 10.5858L5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L10.5858 12L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L12 13.4142L18.2929 19.7071Z" />
                </svg>
              </button>
            </div>
            <div
              className="px-4 pb-6"
              onClick={() => setIsOpen(false)}
              onKeyDown={() => null}
              tabIndex={-1}
              role="menu"
            >
              {pathname !== `/` && (
                <Link
                  href="/"
                  title="Inicio"
                  className="block w-full mt-8 font-medium transition-all duration-200 text-secondary hover:text-primary"
                >
                  Inicio
                </Link>
              )}
              <Link
                href="/sobre-mi"
                title="Sobre Mí"
                className="block w-full mt-8 font-medium transition-all duration-200 text-secondary hover:text-primary"
              >
                Sobre Mí
              </Link>
              <Link
                href="/open-source"
                title="Open Source"
                className="block w-full mt-8 font-medium transition-all duration-200 text-secondary hover:text-primary"
              >
                Open Source
              </Link>
              <Link
                href="/portafolio"
                title="Portafolio"
                className="block w-full mt-8 font-medium transition-all duration-200 text-secondary hover:text-primary"
              >
                Portafolio
              </Link>
              <Link
                href="/blog"
                title="Blog"
                className="block w-full mt-8 font-medium transition-all duration-200 text-secondary hover:text-primary"
              >
                Blog
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="p-4">
              <Link
                href="/contacto"
                title="Contacto"
                className="block px-3 py-3 font-medium text-center text-gray-900 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Contactame
              </Link>
            </div>
          </div>
        </Transition>
      </div>
    </>
  )
}

export default Header
