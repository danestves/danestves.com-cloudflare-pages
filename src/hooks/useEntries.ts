// Dependencies
import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

// Interfaces
import { Blog, Portfolio, UseEntriesReturn } from '@/interfaces'

// Utils
import { getEntries } from '@/utils/api'
import { Params } from 'next/dist/next-server/server/router'

const useEntries = (slug: string): UseEntriesReturn => {
  // States
  const [fetching, setFetching] = useState(true)
  const [start, setStart] = useState(0)
  const [limit] = useState(9)
  const [items, setItems] = useState<Portfolio[] | Blog[] | []>([])
  const [count, setCount] = useState(0)
  const [itemsFetched, setItemsFetched] = useState(0)

  // Hooks
  const router = useRouter()

  // Constants
  const isFirstPage = start === 0
  const hasPages = !(start + limit >= count)
  const fetchParams: Params = {
    _sort: 'createdAt:DESC',
    _limit: router.query?._limit || limit,
    _start: router.query?._start,
    ...router.query,
  }

  // Methods
  const getData = async (): Promise<unknown> => {
    setFetching(true)

    Object.entries(router.query).forEach(([key, value]) => {
      fetchParams[key] = value
    })

    const items = await getEntries(slug, fetchParams)

    if (!items) return null

    setItems(items.entries)
    setCount(Number(items.count))
    setItemsFetched(itemsFetched + items.entries.length)
    setFetching(false)
  }

  /**
   * Handle functionality for previous page
   *
   * @returns Change the current URL for the previous page.
   */
  const handlePrevPage = (): Promise<boolean> => {
    let limitItems

    limitItems = start - limit

    if (limitItems < 0) {
      limitItems = 0
    }

    setStart(limitItems)

    return router.push({
      query: {
        ...router.query,
        _start: limitItems,
        _limit: limit,
      },
    })
  }

  /**
   * Handle functionality for next page
   *
   * @returns Change the current URL for the next page.
   */
  const handleNextPage = (): Promise<boolean> => {
    const limitItems = start + limit

    setStart(limitItems)

    return router.push({
      query: {
        ...router.query,
        _start: limitItems,
        _limit: limit,
      },
    })
  }

  // Effects
  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [router.query])

  return {
    loading: fetching,
    items,
    isFirstPage,
    hasPages,
    handlePrevPage,
    handleNextPage,
  }
}

export default useEntries
