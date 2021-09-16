// Dependencies
import { Snippet } from 'react-instantsearch-dom'
import { HiOutlineDocument, HiOutlineArrowRight } from 'react-icons/hi'

// Internals
import { Link } from '@/components'

interface SearchHitProps {
  hit: any
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchHit = ({ hit, setOpen }: SearchHitProps): JSX.Element => {
  return (
    <div className="relative my-1 group">
      <Link
        className="block pr-5 pl-4 bg-[#f9fafb] group-hover:bg-secondary rounded-lg shadow-search-item dark:bg-[#393939]"
        href={`/posts/${hit.slug}`}
        locale={hit.locale}
        onClick={() => setOpen(false)}
      >
        <div className="flex items-center h-16">
          <div className="flex-none mr-[0.875rem]">
            <HiOutlineDocument className="w-5 h-auto text-[#71717a] group-hover:text-white" />
          </div>

          <div className="flex flex-col flex-auto min-w-0">
            <p className="overflow-hidden font-semibold leading-6 text-left text-black overflow-ellipsis whitespace-nowrap group-hover:text-white dark:text-[#F5F5F5]">
              <Snippet attribute="title" hit={hit} />
            </p>
            <p className="overflow-hidden text-sm font-normal leading-6 text-left text-gray-400 overflow-ellipsis whitespace-nowrap group-hover:text-white">
              <Snippet attribute="seo.description" hit={hit} />
            </p>
          </div>

          <div className="flex-none mr-[0.875rem]">
            <HiOutlineArrowRight className="w-5 h-5 text-[#71717a] group-hover:text-white" />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchHit
