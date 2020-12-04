// Dependencies
import * as React from 'react'
import { useRouter } from 'next/dist/client/router'

type PaginationProps = {
  model: string
  count: number
  page: number
}

const Pagination = ({ model, count, page }: PaginationProps): JSX.Element => {
  // Hooks
  const router = useRouter()

  // Render
  const lastPage = Math.ceil(count / 8)

  return (
    <div className="flex items-center justify-between mt-6">
      <div>
        {!(page <= 1) && (
          <button
            type="button"
            aria-label="Anterior"
            className="flex items-center px-6 py-2 font-semibold rounded focus:outline-none bg-primary text-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
            onClick={() => router.push(`/${model}?page=${page - 1}`)}
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Anterior
          </button>
        )}
      </div>

      <div>
        {!(page >= lastPage) && (
          <button
            type="button"
            aria-label="Siguiente"
            className="flex items-center px-6 py-2 font-semibold rounded focus:outline-none bg-primary text-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
            onClick={() => router.push(`/${model}?page=${page + 1}`)}
          >
            Siguiente
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default Pagination
