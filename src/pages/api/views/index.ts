// Dependencies
import { NextApiRequest, NextApiResponse } from 'next'

// libraries
import db from '@/lib/firebase'

export default async (_: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const snapshot = (await db.collection('views').get()).docs
  const views = snapshot.map((snapshot) => {
    return snapshot.data().value
  })

  return res.status(200).json({ total: eval(views.join('+')) })
}
