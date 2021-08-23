/**
 * Custom fetcher to handle the fetching of the data with SWR.
 */
export async function fetcher(
  url: string,
  options?: RequestInit
): Promise<any> {
  return fetch(url, options).then((res) => res.json())
}
