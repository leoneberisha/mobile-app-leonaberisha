import { useState } from 'react'
import { signInUser, signUpUser, signOutUser } from '../config/supabase'

export function Auth({ user, onAuthChange }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLogout = async () => {
    setLoading(true)
    // Clear local storage and set signed out flag
    localStorage.removeItem('cv_data')
    localStorage.setItem('signed_out', 'true')
    await signOutUser()
    // Force page reload to reset state
    window.location.reload()
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Clear signed out flag on login
    localStorage.removeItem('signed_out')
    
    try {
      const authFn = isSignUp ? signUpUser : signInUser
      const { data, error: authError } = await authFn(email, password)

      if (authError) {
        setError(authError.message || 'Authentication failed')
      } else {
        if (isSignUp) {
          setSuccess('Account created! Please sign in.')
          setIsSignUp(false)
          setEmail('')
          setPassword('')
        } else {
          setSuccess('Signed in successfully!')
          setTimeout(() => onAuthChange(), 1000)
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    // Clear local storage on logout
    localStorage.removeItem('cv_data')
    await signOutUser()
    // Force page reload to reset state
    window.location.reload()
  }

  if (user) {
    return (
      <div className="auth-section">
        <span>👤 {user.email}</span>
        <button 
          className="btn btn-logout" 
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    )
  }

  return (
    <div className="auth-modal">
      <div className="auth-card">
        <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
        
        <form onSubmit={handleAuth}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p style={{ color: '#4caf50', textAlign: 'center', marginBottom: '1rem' }}>{success}</p>}

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="auth-toggle">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
              setSuccess('')
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-start)',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </p>
      </div>
    </div>
  )
}
