const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:3000' : 'https://danestves.com'

export default async function Fetcher(
  input: RequestInfo,
  init?: RequestInit | undefined
): Promise<Response> {
  const res = await fetch(input, init)

  return res.json()
}
