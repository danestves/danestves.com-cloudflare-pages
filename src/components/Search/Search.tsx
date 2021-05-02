// Dependencies
import { Fragment, useRef, useState, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { useHotkeys } from 'react-hotkeys-hook'
import { useClickAway } from 'react-use'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Hits, Configure } from 'react-instantsearch-dom'

// Components
import { SearchHeader } from './Header'
import { SearchHit } from './Hit'
import { SearchFooter } from './Footer'

export const Search = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const searchInputRef = useRef<HTMLInputElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useHotkeys('cmd+k', () => setOpen(true))
  useHotkeys('ctrl+k', () => setOpen(true))
  useHotkeys('esc', () => setOpen(false))
  useClickAway(boxRef, () => setOpen(false))

  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
      ),
    []
  )

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        <SearchIcon className="w-6 h-6 text-white" />
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-[999999] overflow-y-auto"
          initialFocus={searchInputRef}
          open={open}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
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
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="fixed left-0 top-0 h-screen w-screen z-[200] flex flex-col p-4 sm:p-6 md:p-[10vh] lg:p-[12vh]">
              <Transition.Child
                as={Fragment}
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
                    ref={boxRef}
                    className="mx-auto w-full max-w-[47.375rem] flex flex-col min-h-0 rounded-[1rem] bg-white px-6 shadow-search"
                  >
                    <InstantSearch
                      searchClient={searchClient}
                      indexName="posts"
                      onSearchStateChange={({ query }) => setSearch(query)}
                    >
                      <SearchHeader />
                      <Configure hitsPerPage={5} />

                      {search.length > 0 && (
                        <div className="flex-auto pb-6 overflow-auto rounded-b-2xl">
                          <div id="search-container">
                            <Hits
                              hitComponent={(props) => <SearchHit {...props} setOpen={setOpen} />}
                            />
                          </div>
                        </div>
                      )}

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
