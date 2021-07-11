// Dependencies
import 'isomorphic-fetch'
import { GiphyFetch } from '@giphy/js-fetch-api'
import type { NextApiRequest, NextApiResponse } from 'next'

const giphyFetch = new GiphyFetch(process.env.GIPHY_TOKEN as string)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    const { data } = await giphyFetch.gif(req.query.slug as string)

    return res.status(200).json({ gif: data })
  }

  return res.status(400).send('Method not allowed')
}
