// Dependencies
import { connectSearchBox } from 'react-instantsearch-dom'
import { SearchIcon, XIcon } from '@heroicons/react/solid'

export const SearchHeader = connectSearchBox(({ refine }) => {
  return (
    <header className="flex relative z-[1] flex-none items-center border-[#e5e7eb] border-b">
      <form
        action={undefined}
        className="flex items-center flex-auto min-w-0"
        noValidate
        role="search"
      >
        <label className="flex-none" htmlFor="search-input" id="search-label">
          <SearchIcon className="w-6 h-6 text-[#5468FF]" />
        </label>

        <input
          aria-autocomplete="list"
          aria-labelledby="search-label"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="flex-auto mx-4 min-w-0 h-[4.5rem] font-sans text-base font-normal text-black bg-transparent appearance-none focus-visible:focus:outline-none"
          id="search-input"
          maxLength={64}
          onChange={(e) => refine(e.target.value)}
          placeholder="Search posts"
          spellCheck={false}
          type="text"
        />

        <button className="hidden" title="Clear the query" type="reset">
          esc <XIcon />
        </button>
      </form>

      <button className="before:content-['esc'] flex-none py-[0.125rem] px-[0.374rem] text-[0px] before:text-[#9ca3af] before:text-sm before:leading-5 bg-[#f9fafb] rounded-md border-[#d1d5db] border">
        Cancel
      </button>
    </header>
  )
})

export default SearchHeader
