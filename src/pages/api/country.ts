// Dependencies
import type { NextApiRequest, NextApiResponse } from 'next'

// Internals
import { getIP } from '@/lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const country = await fetch(
      `https://extreme-ip-lookup.com/json/${getIP(req)}`
    )
      .then((response) => response.json())
      .then((json) => json.countryCode)

    return res.json({ country })
  } catch (error) {
    return res.status(200).json(error)
  }
}
