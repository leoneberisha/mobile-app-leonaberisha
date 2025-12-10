import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')
}

export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-key'
)

// Auth functions
export const signUpUser = async (email, password) => {
  if (!email || !password) {
    return { data: null, error: { message: 'Email and password are required' } }
  }
  if (password.length < 6) {
    return { data: null, error: { message: 'Password must be at least 6 characters' } }
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  return { data, error }
}

export const signInUser = async (email, password) => {
  if (!email || !password) {
    return { data: null, error: { message: 'Email and password are required' } }
  }
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
