// Dependencies
import { Snippet } from 'react-instantsearch-dom'
import { DocumentIcon, ArrowSmRightIcon } from '@heroicons/react/outline'

// Internals
import { Link } from '@/components'

interface SearchHitProps {
  hit: any
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchHit = ({ hit, setOpen }: SearchHitProps): JSX.Element => {
  return (
    <div className="group relative">
      <Link
        className="block pr-5 pl-4 bg-[#f9fafb] group-hover:bg-[#5468FF] rounded-lg shadow-search-item"
        href={`/blog/${hit.slug}-${hit.id}`}
        locale={hit.locale}
        onClick={() => setOpen(false)}
      >
        <div className="flex items-center h-16">
          <div className="flex-none mr-[0.875rem]">
            <DocumentIcon className="w-5 h-5 text-[#71717a] group-hover:text-white" />
          </div>

          <div className="flex flex-col flex-auto min-w-0">
            <p className="overflow-hidden font-semibold leading-6 text-left text-black group-hover:text-white overflow-ellipsis whitespace-nowrap">
              <Snippet attribute="title" hit={hit} />
            </p>
            <p className="overflow-hidden text-sm font-normal leading-6 text-left text-gray-400 group-hover:text-white overflow-ellipsis whitespace-nowrap">
              <Snippet attribute="body" hit={hit} />
            </p>
          </div>

          <div className="flex-none mr-[0.875rem]">
            <ArrowSmRightIcon className="w-5 h-5 text-[#71717a] group-hover:text-white" />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchHit
