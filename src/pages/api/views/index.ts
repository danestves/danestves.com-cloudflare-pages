// Internals
import { handler } from '@/lib/handler'
import { supabase } from '@/lib/supabase'

export default handler.get(async (req, res) => {
  const { data: views, error } = await supabase
    .from('views')
    .select('value')
    .then((res) => {
      const views = res.data.reduce((a, b) => {
        return a.value + b.value
      })

      return {
        ...res,
        data: views,
      }
    })

  if (error) {
    return res.status(400).json({ error })
  }

  return res.status(200).json({ views })
})
