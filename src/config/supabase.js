import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Auth functions
export const signUpUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  return { data, error }
}

export const signInUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// CV Data functions
export const saveCVData = async (userId, cvData) => {
  const { data, error } = await supabase
    .from('cvs')
    .upsert(
      {
        user_id: userId,
        data: cvData,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'user_id' }
    )
    .select()
  
  return { data, error }
}

export const getCVData = async (userId) => {
  const { data, error } = await supabase
    .from('cvs')
    .select('data')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

export const deleteCVData = async (userId) => {
  const { error } = await supabase
    .from('cvs')
    .delete()
    .eq('user_id', userId)
  
  return { error }
}
