// Internals
import { handler } from '@/lib/handler'
import prisma, { getPostViews } from '@/lib/prisma'

export default handler
  .post(async (req, res) => {
    try {
      const slug = req.query.slug.toString()
      const newOrUpdatedViews = await prisma.views.upsert({
        create: {
          slug,
        },
        update: {
          count: {
            increment: 1,
          },
        },
        where: { slug },
      })

      return res.status(200).json({
        views: newOrUpdatedViews.count.toString(),
      })
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  })
  .get(async (req, res) => {
    try {
      const slug = req.query.slug.toString()

      const views = await getPostViews(slug)

      return res.status(200).json({ views: views.count.toString() })
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  })
