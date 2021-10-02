// Internals
import { handler } from '@/lib/handler'

export default handler.get(async (_, res) => {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/posts' })
  res.end()
})
