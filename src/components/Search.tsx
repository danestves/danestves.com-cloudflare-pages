// Internals
import { SearchIcon } from '@/components/Icons'

export const Search = (): JSX.Element => {
  return (
    <button className="p-2 rounded-full bg-primary" type="button">
      <SearchIcon className="w-5 h-5 text-white" />
    </button>
  )
}

export default Search
