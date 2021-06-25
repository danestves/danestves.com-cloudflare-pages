// Dependencies
import type { NextApiRequest, NextApiResponse } from 'next'
import algoliasearch from 'algoliasearch'

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
)
const index = algolia.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME)

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') return res.end()

  if (req.headers['authorization'] !== process.env.WEBHOOK_SECRET_KEY) {
    return res.status(401).end()
  }

  try {
    const { data: post } = req.body

    if (post.stage === 'PUBLISHED') {
      const { id, localizations, ...data } = post

      for await (const locale of localizations) {
        await index.saveObject({ objectID: `${id}-${locale.locale}`, id, ...locale, ...data })
      }

      res.send(201)
    }
  } catch (err) {
    console.error(err?.message)

    res.status(400).send(err?.message)
  }
}
