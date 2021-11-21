// Dependencies
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

// Internals
import { getIP } from '@/lib/getIP'
import type { IPLookup } from '@/types/IpLookup'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.get<IPLookup>(
      `https://extreme-ip-lookup.com/json/${getIP(req)}?key=${
        process.env.IP_LOOKUP_API_KEY
      }`
    )

    return res.status(200).json({ country: data?.countryCode || 'US' })
  } catch (error) {
    return res.status(400).json(error)
  }
}
