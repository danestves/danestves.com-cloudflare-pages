// Dependencies
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const getViewsBySlug = async (slug: string) => {
  return supabase
    .from<{ id: string; value: number }>('views')
    .select('value')
    .eq('id', slug)
    .single()
    .then((result) => {
      return result.data.value
    })
}

export default supabase
