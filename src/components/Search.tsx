// Dependencies
import { useI18n } from 'next-rosetta'

// Internals
import { SearchIcon } from '@/components/Icons/SearchIcon'
import type { Locale } from 'i18n'

export const Search = (): JSX.Element => {
  const { t } = useI18n<Locale>()

  return (
    <div className="flex items-center space-x-2">
      <div className="lg:p-2 lg:border lg:rounded-full lg:border-primary">
        <button
          aria-label={t('search')}
          className="p-2 rounded-full bg-primary"
          type="button"
        >
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </div>
      <span className="text-xs text-[#989898] font-semibold sr-only lg:not-sr-only">
        {t('search')}
      </span>
    </div>
  )
}

export default Search
