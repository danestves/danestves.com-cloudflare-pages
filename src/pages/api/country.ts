// Internals
import { handler } from '@/lib/handler'

export default handler.get(async (_, res) => {
  return res.status(200).json({
    countryCode: res.getHeader('x-country-code'),
  })
})
