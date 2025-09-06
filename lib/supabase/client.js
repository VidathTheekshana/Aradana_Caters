import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export function createClient() {
  // Change back to NEXT_PUBLIC_ prefix
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is required')
  }
  
  if (!supabaseKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is required')
  }

  return createSupabaseClient(supabaseUrl, supabaseKey)
}