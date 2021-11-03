// Internals
import { handler } from '@/lib/handler'
import { supabase } from '@/lib/supabase'

export default handler
  .post(async (req, res) => {
    try {
      const { slug } = req.query
      const { data } = await supabase
        .from('views')
        .select('value')
        .eq('id', slug)
        .limit(1)

      if (!data.length) {
        await supabase.from('views').insert({ id: slug, value: 1 })
      } else {
        await supabase
          .from('views')
          .update({ value: data[0].value + 1 })
          .eq('id', slug)
      }

      const currentViews = await supabase
        .from('views')
        .select('value')
        .eq('id', slug)
        .limit(1)

      return res.status(200).json({ views: currentViews.data[0].value })
    } catch (error) {
      return res.status(500).json({ error })
    }
  })
  .get(async (req, res) => {
    const { data: views, error } = await supabase
      .from('views')
      .select('value')
      .eq('id', req.query.slug)

    if (error) {
      return res.status(400).json({ error })
    }

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    return res.status(200).json({ views: views.length ? views[0].value : 0 })
  })
