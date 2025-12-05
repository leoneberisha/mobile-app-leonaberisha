import { createClient } from '@supabase/supabase-js'

// Vite exposes env vars prefixed with VITE_ through import.meta.env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in your environment')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabase
