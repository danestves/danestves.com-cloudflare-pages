// Dependencies
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const LanguageSwitcher = (): JSX.Element => {
  const { locale, locales, route, push, asPath } = useRouter()

  const handleChangeLanguage = (lang: string) => {
    return push(route, asPath, { locale: lang })
  }

  return (
    <Listbox
      as="div"
      className="space-y-1"
      onChange={handleChangeLanguage}
      value={locale || 'en'}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <span className="inline-block w-full rounded-md">
              <Listbox.Button
                className="relative w-full py-2 pl-3 pr-8 text-left rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:rounded sm:text-sm"
                title="Change the language of the page"
              >
                <span className="flex items-center w-8">
                  <Image
                    alt={locale}
                    className="flex-shrink-0"
                    height={30}
                    objectFit="contain"
                    src={`/static/lang/${locale}.svg`}
                    width={60}
                  />
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <ChevronDownIcon className="w-5 h-5" />
                </span>
              </Listbox.Button>
            </span>

            <Transition
              className="absolute z-20 w-full mt-1 rounded-md shadow-lg backdrop-filter backdrop-blur-[20px] saturate-[180%] bg-opacity-70 bg-white dark:bg-secondary-500 dark:bg-opacity-60"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={open}
            >
              <Listbox.Options
                className="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5"
                static
              >
                {locales?.map((loc) => (
                  <Listbox.Option key={loc} value={loc}>
                    {({ selected, active }) => (
                      <div
                        className={clsx(
                          'cursor-pointer select-none relative py-2 pl-3 pr-9',
                          active
                            ? 'text-white bg-secondary-600 hover:text-white'
                            : 'text-white'
                        )}
                      >
                        <div className="flex items-center">
                          <Image
                            alt={loc}
                            className="flex-shrink-0 w-8 h-6"
                            height={24}
                            src={`/static/lang/${loc}.svg`}
                            width={32}
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
                              aria-hidden="true"
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                clipRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                fillRule="evenodd"
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
