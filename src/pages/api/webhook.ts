// Dependencies
import algoliasearch from 'algoliasearch'
import type { NextApiRequest, NextApiResponse } from 'next'

// Internals
import { sdk } from '@/lib/graphcms'

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
)
const index = algolia.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') return res.end()

  if (req.headers['authorization'] !== process.env.WEBHOOK_SECRET_KEY) {
    return res.status(401).end()
  }

  try {
    const { data: post } = req.body

    if (post.stage === 'PUBLISHED') {
      const { id, localizations, ...data } = post

      // We get the Asset URL from Post
      const { data: asset } = await sdk().asset({
        id: post.cover.id,
      })

      for await (const locale of localizations) {
        // We get the SEO with Locale
        const { data: seo } = await sdk().seo({
          id: data.seo.id,
          locale: locale.locale,
        })

        await index.saveObject({
          cover: {
            ...data.cover,
            ...asset.asset,
          },
          id,
          locale: locale.locale,
          objectID: `${id}-${locale.locale}`,
          seo: {
            ...data.seo,
            ...seo.seo,
          },
          slug: data.slug,
          title: locale.title,
        })
      }

      return res.send(201)
    } else if (post.stage === 'DRAFT') {
      const { data: post } = req.body

      for await (const locale of post.localizations) {
        await index.deleteObject(`${post.id}-${locale.locale}`)
      }

      return res.send(201)
    }
  } catch (err) {
    console.error(err?.message)

    res.status(400).send(err?.message)
  }
}
