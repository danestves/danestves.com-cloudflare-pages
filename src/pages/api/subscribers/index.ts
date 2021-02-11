// Dependencies
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const API_KEY = process.env.REVUE_TOKEN

  if (req.method === 'POST') {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    try {
      const response = await fetch(`https://www.getrevue.co/api/v2/subscribers`, {
        body: JSON.stringify({
          email,
          double_opt_in: false,
        }),
        headers: {
          Authorization: `Token ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (response.status >= 400) {
        const text = await response.text()

        return res.status(400).json({
          error: text,
        })
      }

      return res.status(201).json({ error: '' })
    } catch (error) {
      return res.status(500).json({ error: error.message || error.toString() })
    }
  }

  if (req.method === 'GET') {
    const response = await fetch(`https://www.getrevue.co/api/v2/subscribers`, {
      headers: {
        Authorization: `Token ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    const subscribers = await response.json()

    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

    return res.status(200).json({ count: subscribers.length })
  }

  return res.status(400).send('Method not allowed')
}
