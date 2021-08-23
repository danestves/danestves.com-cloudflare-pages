// Dependencies
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const country = await fetch('https://extreme-ip-lookup.com/json/')
      .then((response) => response.json())
      .then((json) => json.countryCode)

    return res.json({ country, ip: req.connection.remoteAddress })
  } catch (error) {
    return res.status(200).json(error)
  }
}
