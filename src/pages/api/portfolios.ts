// Dependencies
import { NextApiRequest, NextApiResponse } from 'next'

// Lib
import { getPortfolios } from '@/lib/graphcms'

export default async function handler(
  { query: { first = '4', skip = '0' } }: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const data = await getPortfolios(Number(first), Number(skip))

  return res.status(200).json(data)
}
