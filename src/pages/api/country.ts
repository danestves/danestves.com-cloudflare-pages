// Dependencies
import axios from 'axios'

// Internals
import { getIP } from '@/lib/getIP'
import { handler } from '@/lib/handler'
import type { IPLookup } from '@/types/IpLookup'

export default handler.get(async (req, res) => {
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
})
