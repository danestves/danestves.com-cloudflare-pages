// Dependencies
import * as React from 'react';
import { Link } from 'gatsby';
import { Transition } from '@tailwindui/react';

// Hooks
import { useDocumentScrollThrottled, useScrollPosition } from '../hooks';

// Components
import { Navbar, Logo } from '.';

// Types
import { ArgsUseDocumentType } from '../types';

type Props = {
  pathname: string;
};

const Header: React.FC<Props> = ({ pathname }) => {
  // States
  const [isOpen, setIsOpen] = React.useState(false);
  const [shouldHideHeader, setShouldHideHeader] = React.useState(false);
  const [shouldShowShadow, setShouldShowShadow] = React.useState(false);
  const { y } = useScrollPosition();

  const MINIMUM_SCROLL = 0;
  const TIMEOUT_DELAY = 0;
  const shadowStyle = shouldShowShadow ? `shadow-md` : `shadow-none`;
  const hiddenStyle = shouldHideHeader
    ? ` -translate-y-full bg-transparent`
    : `${y > 80 ? ` backdrop-blur bg-opacity-50 bg-white` : ``}`;

  // Methods
  useDocumentScrollThrottled((cb: ArgsUseDocumentType) => {
    const { previousScrollTop, currentScrollTop } = cb;
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

    setShouldShowShadow(currentScrollTop > 2);

    setTimeout(() => {
      setShouldHideHeader(isScrolledDown && isMinimumScrolled);
    }, TIMEOUT_DELAY);
  });

  // Render
  return (
    <>
      <header className={`fixed z-100 top-0 w-full transition-all duration-200 transform ${shadowStyle}${hiddenStyle}`}>
        <div className="md:px-8">
          <Navbar>
            {pathname !== `/` && (
              <div className="relative flex-1 flex-shrink-0 py-4 pl-4 md:p-0">
                <Link to="/" title="Inicio">
                  <Logo className="w-8 h-8 text-primary" />
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
                  to="/sobre-mi/"
                  title="Sobre Mí"
                  className={`relative px-3 text-sm font-medium transition-all duration-200 ${
                    y > 80 ? `text-secondary` : `text-primary`
                  } hover:text-white py-7 focus:outline-none`}
                >
                  Sobre Mí
                </Link>
                <Link
                  to="/apps/"
                  title="Apps"
                  className={`px-3 text-sm font-medium transition-all duration-200 ${
                    y > 80 ? `text-secondary` : `text-primary`
                  } py-7 hover:text-white`}
                >
                  Apps
                </Link>
                <Link
                  to="/portafolio/"
                  title="Portafolio"
                  className={`px-3 text-sm font-medium transition-all duration-200 ${
                    y > 80 ? `text-secondary` : `text-primary`
                  } py-7 hover:text-white`}
                >
                  Portafolio
                </Link>
                <Link
                  to="/blog/"
                  title="Blog"
                  className={`px-3 text-sm font-medium transition-all duration-200 ${
                    y > 80 ? `text-secondary` : `text-primary`
                  } py-7 hover:text-white`}
                >
                  Blog
                </Link>
                <Link
                  to="/contacto/"
                  title="Contacto"
                  className={`px-3 text-sm font-medium transition-all duration-200 ${
                    y > 80 ? `text-secondary` : `text-primary`
                  } py-7 hover:text-white`}
                >
                  Contacto
                </Link>
              </div>
            </div>
          </Navbar>
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
            <div className="px-4 pb-6" onClick={() => setIsOpen(false)}>
              {pathname !== `/` && (
                <Link
                  to="/"
                  title="Inicio"
                  className="block w-full mt-8 font-medium transition-all duration-200 text-secondary hover:text-primary"
                >
                  Inicio
                </Link>
              )}
              <Link
                to="/sobre-mi/"
                title="Sobre Mí"
                className="block w-full mt-8 font-medium transition-all duration-200 text-secondary hover:text-primary"
              >
                Sobre Mí
              </Link>
              <Link
                to="/apps/"
                title="Apps"
                className="block w-full mt-8 font-medium transition-all duration-200 text-secondary hover:text-primary"
              >
                Apps
              </Link>
              <Link
                to="/portafolio/"
                title="Portafolio"
                className="block w-full mt-8 font-medium transition-all duration-200 text-secondary hover:text-primary"
              >
                Portafolio
              </Link>
              <Link
                to="/blog/"
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
                to="/contacto/"
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
  );
};

export default Header;
