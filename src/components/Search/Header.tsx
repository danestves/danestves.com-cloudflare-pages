// Dependencies
import { connectSearchBox } from 'react-instantsearch-dom'
import { SearchIcon, XIcon } from '@heroicons/react/solid'

export const SearchHeader = connectSearchBox(({ refine }) => {
  return (
    <header className="flex-none border-b border-[#e5e7eb] relative z-[1] flex items-center">
      <form
        action={undefined}
        role="search"
        noValidate
        className="flex items-center flex-auto min-w-0"
      >
        <label htmlFor="search-input" id="search-label" className="flex-none">
          <SearchIcon className="w-6 h-6 text-[#5468FF]" />
        </label>

        <input
          type="text"
          className="appearance-none bg-transparent h-[4.5rem] text-base font-normal font-sans text-black mx-4 flex-auto min-w-0 focus:outline-none focus-visible:outline-none"
          aria-autocomplete="list"
          aria-labelledby="search-label"
          id="search-input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Search posts"
          maxLength={64}
          onChange={(e) => refine(e.target.value)}
        />

        <button type="reset" title="Clear the query" className="hidden">
          esc <XIcon />
        </button>
      </form>

      <button
        className="flex-none text-[0px] rounded-md bg-[#f9fafb] border border-[#d1d5db] py-[0.125rem] px-[0.374rem] content-before before:text-[#9ca3af] before:text-sm before:leading-5"
        tw-content-before="esc"
      >
        Cancel
      </button>
    </header>
  )
})

export default SearchHeader
