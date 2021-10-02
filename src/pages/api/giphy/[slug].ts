// Dependencies
import { GiphyFetch } from '@giphy/js-fetch-api/dist/api'

// Internals
import { handler } from '@/lib/handler'

const giphyFetch = new GiphyFetch(process.env.GIPHY_TOKEN as string)

export default handler.get(async (req, res) => {
  const { data } = await giphyFetch.gif(req.query.slug as string)

  return res.status(200).json({ gif: data })
})
