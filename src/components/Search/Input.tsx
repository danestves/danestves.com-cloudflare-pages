// Dependencies
import { HiSearch, HiX } from 'react-icons/hi'
import { connectSearchBox } from 'react-instantsearch-dom'
import { useI18n } from 'next-rosetta'

// Internals
import type { Locale } from 'i18n'

export const SearchInput = connectSearchBox(({ currentRefinement, refine }) => {
  const { t } = useI18n<Locale>()

  return (
    <header className="flex relative z-[1] flex-none items-center border-[#e5e7eb] border-b">
      <form
        action={undefined}
        className="flex items-center flex-auto min-w-0"
        noValidate
        role="search"
      >
        <label className="flex-none" htmlFor="search-input" id="search-label">
          <HiSearch className="w-6 h-6 text-secondary" />
        </label>

        <input
          aria-autocomplete="list"
          aria-labelledby="search-label"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="flex-auto mx-4 min-w-0 h-[4.5rem] font-sans text-base font-normal text-black bg-transparent appearance-none focus-visible:focus:outline-none"
          enterKeyHint="go"
          id="search-input"
          maxLength={64}
          onChange={(e) => refine(e.target.value)}
          placeholder={t('components.search.input.placeholder')}
          spellCheck={false}
          type="search"
          value={currentRefinement}
        />

        <button className="hidden" title="Clear the query" type="reset">
          <kbd>esc</kbd> <HiX />
        </button>
      </form>

      <button className="before:content-['esc'] flex-none py-[0.125rem] px-[0.374rem] text-[0px] before:text-[#9ca3af] before:text-sm before:leading-5 bg-[#f9fafb] rounded-md border-[#d1d5db] border">
        {t('components.search.input.cancel')}
      </button>
    </header>
  )
})

export default SearchInput
