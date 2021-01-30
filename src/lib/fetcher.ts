export default async function Fetcher(
  input: RequestInfo,
  init?: RequestInit | undefined
): Promise<Response> {
  const res = await fetch(input, init)

  return res.json()
}
