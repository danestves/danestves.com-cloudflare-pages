// Dependencies
import { useRouter } from 'next/dist/client/router'
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import clsx from 'clsx'

const LanguageSwitcher = (): JSX.Element => {
  const { locale, locales, route, push, asPath } = useRouter()

  const handleChangeLanguage = (lang: string) => {
    if (route === '/portafolio/[slug]') {
      return push(route, asPath, { locale: lang })
    } else {
      return push(route, route, { locale: lang })
    }
  }

  return (
    <Listbox as="div" className="space-y-1" value={locale || 'en'} onChange={handleChangeLanguage}>
      {({ open }) => (
        <>
          <div className="relative">
            <span className="inline-block w-full rounded-md shadow-sm">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left border border-gray-300 rounded-md shadow-sm cursor-default bg-secondary-400 focus:outline-none focus:ring-1 focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm">
                <span className="flex items-center">
                  <Image
                    src={`/static/lang/${locale}.svg`}
                    alt={locale}
                    width={32}
                    height={32}
                    className="flex-shrink-0 w-8 h-8"
                  />
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  {/* Heroicon name: solid/selector */}
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Listbox.Button>
            </span>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute z-20 w-full mt-1 rounded-md shadow-lg bg-secondary-400"
            >
              <Listbox.Options
                static
                className="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5"
              >
                {locales?.map((loc) => (
                  <Listbox.Option key={loc} value={loc}>
                    {({ selected, active }) => (
                      <div
                        className={clsx(
                          'cursor-pointer select-none relative py-2 pl-3 pr-9',
                          active ? 'text-white bg-secondary-600 hover:text-white' : 'text-white'
                        )}
                      >
                        <div className="flex items-center">
                          <Image
                            src={`/static/lang/${loc}.svg`}
                            alt={loc}
                            width={32}
                            height={24}
                            className="flex-shrink-0 w-8 h-6"
                          />
                        </div>

                        {selected && (
                          <span
                            className={clsx(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-secondary-600'
                            )}
                          >
                            {/* Heroicon name: solid/check */}
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default LanguageSwitcher
