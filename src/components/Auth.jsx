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
    localStorage.removeItem('user_email')
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

    // Local mode - save email and clear signed out flag
    if (email) {
      localStorage.setItem('user_email', email)
    }
    localStorage.removeItem('signed_out')
    setSuccess('Signed in successfully!')
    setTimeout(() => window.location.reload(), 500)
  }

  if (user) {
    return (
      <div className="auth-section">
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
