import { useState, useEffect, useCallback } from 'react'
import supabase from '../lib/supabaseClient'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (err) {
        console.error('Auth check error:', err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const signUp = useCallback(async (email, password) => {
    setError(null)
    try {
      const { data, error: err } = await supabase.auth.signUp({ email, password })
      if (err) throw err
      return { data, error: null }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err.message }
    }
  }, [])

  const signIn = useCallback(async (email, password) => {
    setError(null)
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) throw err
      return { data, error: null }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err.message }
    }
  }, [])

  const signOut = useCallback(async () => {
    setError(null)
    try {
      const { error: err } = await supabase.auth.signOut()
      if (err) throw err
    } catch (err) {
      setError(err.message)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
