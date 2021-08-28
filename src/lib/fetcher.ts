// Internals
import { axios } from '@/lib'

/**
 * Custom fetcher to handle the fetching of the data with SWR.
 */
export async function fetcher<P = any>(url: string): Promise<P> {
  return axios.get<P>(url).then((res) => res.data)
}
