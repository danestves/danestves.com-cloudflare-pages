// Dependencies
import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { getBlogData } from '@/utils/api'
import { Blog } from '@/interfaces'

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Blog | void | undefined> {
  if (req.query.secret !== process.env.STRAPI_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({
      message: 'Invalid token',
    })
  }

  const post = await getBlogData(req.query.slug as string)

  if (!post) {
    return res.status(401).json({
      message: 'Invalid slug',
    })
  }

  res.setPreviewData({})

  res.writeHead(307, { Location: `/blog/${post.slug}` })
  res.end()
}
