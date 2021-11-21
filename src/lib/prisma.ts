// Dependencies
import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

/**
 * Get views from the database
 *
 * @param slug - Slug of the post
 */
export async function getPostViews(slug: string) {
  const views = await prisma.views.findUnique({
    where: {
      slug,
    },
  })

  return views
}

export default prisma
