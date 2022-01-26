// Dependencies
import { PrismaClient } from '@prisma/client';

let db = new PrismaClient();

async function getPostViews(slug: string) {
  let data = await db.views.findUnique({
    where: {
      slug,
    },
  });

  return data?.count || 0;
}

export { db, getPostViews };
