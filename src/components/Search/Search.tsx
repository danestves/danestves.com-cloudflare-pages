// Dependencies
import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useClickOutside } from '@react-hookz/web'
import algoliasearch from 'algoliasearch/lite'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
import { InstantSearch, Hits, Configure } from 'react-instantsearch-dom'
import { usePlausible } from 'next-plausible'
import { useI18n } from 'next-rosetta'

// Internals
import { SearchHit } from './Hit'
import { SearchFooter } from './Footer'
import { SearchInput } from './Input'
import { SearchIcon } from '../Icons'
import type { Locale } from 'i18n'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
)

export const Search = (): JSX.Element => {
  const [isSearchOpen, setSearchOpen] = React.useState(false)
  const [search, setSearch] = React.useState<any>({})

  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const boxRef = React.useRef<HTMLDivElement>(null)

  const plausible = usePlausible()
  const { t } = useI18n<Locale>()
  const router = useRouter()

  useHotkeys('cmd+k', () => setSearchOpen(true))
  useHotkeys('ctrl+k', () => setSearchOpen(true))
  useHotkeys('esc', () => setSearchOpen(false))
  useClickOutside(boxRef, () => setSearchOpen(false))

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="lg:p-2 lg:border lg:rounded-full lg:border-primary">
          <button
            aria-label={t('components.search.button.label')}
            className="p-2 rounded-full bg-primary"
            onClick={() => {
              setSearchOpen(!isSearchOpen)
              plausible('Opened Search')
            }}
            type="button"
          >
            <SearchIcon className="w-5 h-5 text-white dark:text-[#292929]" />
          </button>
        </div>
        <span className="text-xs text-[#989898] font-semibold sr-only dark:text-[#B1B1B1] lg:not-sr-only">
          {t('components.search.button.label')}
        </span>
      </div>

      <Transition.Root as={React.Fragment} show={isSearchOpen}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-[999999]"
          initialFocus={searchInputRef}
          onClose={setSearchOpen}
          open={isSearchOpen}
          static
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              aria-hidden="true"
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
            >
              &#8203;
            </span>
            <div className="flex fixed top-0 left-0 z-[200] flex-col p-4 w-screen h-screen sm:p-6 md:p-[10vh] lg:p-[12vh]">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                {/* Adding an extra div to avoid issues with Ref */}
                <div className="transition-all transform">
                  <div
                    className="flex flex-col px-6 mx-auto w-full max-w-[47.375rem] min-h-0 bg-white rounded-[1rem] shadow-search dark:bg-[#292929]"
                    ref={boxRef}
                  >
                    <InstantSearch
                      indexName="posts"
                      onSearchStateChange={setSearch}
                      searchClient={searchClient}
                      searchState={search}
                    >
                      <SearchInput defaultRefinement={search.query} />
                      <Configure
                        filters={`locale:${router.locale}`}
                        hitsPerPage={5}
                      />

                      <div className="flex-auto py-6 overflow-auto rounded-b-2xl">
                        <div id="search-container">
                          <Hits
                            hitComponent={(props) => (
                              <SearchHit {...props} setOpen={setSearchOpen} />
                            )}
                          />
                        </div>
                      </div>

                      <SearchFooter />
                    </InstantSearch>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Search
