// Dependencies
import { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import db from '@/lib/firebase'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST' && process.env.NODE_ENV === 'production') {
    const docRef = db.collection('views').doc(req.query.slug as string)
    const document = await docRef.get()

    if (!document.data()?.value) {
      await docRef.set({ value: 1 })
    } else {
      await db.runTransaction(async (transaction) => {
        return transaction.get(docRef).then((doc) => {
          transaction.update(docRef, { value: Number(doc.data()?.value || 0) + 1 })
        })
      })
    }

    const getCurrentViews = (await docRef.get()).data()

    return res.status(200).json({ total: getCurrentViews?.value })
  }

  if (req.method === 'GET') {
    const snapshot = await db
      .collection('views')
      .doc(req.query.slug as string)
      .get()
    const views = snapshot.data()?.value

    return res.status(200).json({ total: views })
  }

  return res.status(400).send('Method not allowed')
}
