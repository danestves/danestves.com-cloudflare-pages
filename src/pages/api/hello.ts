// Dependencies
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  res.status(200).json({ name: 'John Doe' })
}
