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
                className="relative py-2 pr-8 pl-3 w-full text-left rounded-md focus-visible:rounded focus-visible:ring-2 focus-visible:ring-black focus:outline-none sm:text-sm"
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

                <span className="flex absolute inset-y-0 right-0 items-center pr-2 ml-3 pointer-events-none">
                  <ChevronDownIcon className="w-5 h-5" />
                </span>
              </Listbox.Button>
            </span>

            <Transition
              className="absolute z-20 mt-1 w-full bg-white dark:bg-secondary-500 bg-opacity-70 dark:bg-opacity-60 rounded-md shadow-lg saturate-[180%] backdrop-filter backdrop-blur-[20px]"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={open}
            >
              <Listbox.Options
                className="overflow-auto py-1 max-h-60 text-base leading-6 rounded-md shadow-sm focus:outline-none sm:text-sm sm:leading-5"
                static
              >
                {locales?.map((loc) => (
                  <Listbox.Option key={loc} value={loc}>
                    {({ selected, active }) => (
                      <div
                        className={clsx(
                          'relative py-2 pr-9 pl-3 cursor-pointer select-none',
                          active
                            ? 'text-white hover:text-white bg-secondary-600'
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
                              'flex absolute inset-y-0 right-0 items-center pr-4',
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
