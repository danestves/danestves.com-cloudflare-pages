// Dependencies
import type { NextApiRequest, NextApiResponse } from 'next'

function getIP(req: NextApiRequest) {
  // req.connection is deprecated
  const conRemoteAddress = req.connection?.remoteAddress
  // req.socket is said to replace req.connection
  const sockRemoteAddress = req.socket?.remoteAddress
  // some platforms use x-real-ip
  const xRealIP = req.headers['x-real-ip']
  // most proxies use x-forwarded-for
  const xForwardedForIP = (() => {
    const xForwardedFor = req.headers['x-forwarded-for'] as string
    if (xForwardedFor) {
      // The x-forwarded-for header can contain a comma-separated list of
      // IP's. Further, some are comma separated with spaces, so whitespace is trimmed.
      const ips = xForwardedFor.split(',').map((ip) => ip.trim())
      return ips[0]
    }
  })()
  // prefer x-forwarded-for and fallback to the others
  return xForwardedForIP || xRealIP || sockRemoteAddress || conRemoteAddress
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const country = await fetch('https://extreme-ip-lookup.com/json/')
      .then((response) => response.json())
      .then((json) => json.countryCode)

    return res.json({ country, ip: getIP(req) })
  } catch (error) {
    return res.status(200).json(error)
  }
}
