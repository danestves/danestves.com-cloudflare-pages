// Dependencies
import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'

// Internals
import { supabase } from '@/lib/supabase'

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
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

export default handler
