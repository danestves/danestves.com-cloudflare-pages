// Internals
import { getIP } from '@/lib/getIP'
import { handler } from '@/lib/handler'

export default handler.get(async (req, res) => {
  try {
    const country = await fetch(
      `https://extreme-ip-lookup.com/json/${getIP(req)}`
    )
      .then((response) => response.json())
      .then((json) => json.countryCode)

    res.setHeader('Cache-Control', 's-maxage=0')

    return res.status(200).json({ country })
  } catch (error) {
    return res.status(400).json(error)
  }
})
