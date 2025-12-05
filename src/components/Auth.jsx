import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function Auth() {
  const { user, error, signUp, signIn, signOut } = useContext(AuthContext)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setMessage('Passwords do not match')
          setLoading(false)
          return
        }
        const { error: err } = await signUp(email, password)
        if (err) {
          setMessage(err)
        } else {
          setMessage('Sign up successful! Check your email to confirm.')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setTimeout(() => setIsSignUp(false), 2000)
        }
      } else {
        const { error: err } = await signIn(email, password)
        if (err) {
          setMessage(err)
        } else {
          setMessage('Signed in successfully!')
          setEmail('')
          setPassword('')
        }
      }
    } catch (err) {
      setMessage(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    await signOut()
    setEmail('')
    setPassword('')
    setMessage('')
    setLoading(false)
  }

  if (user) {
    return (
      <div className="auth-container">
        <div className="auth-panel auth-logged-in">
          <h2>Welcome!</h2>
          <p className="user-email">{user.email}</p>
          <button className="btn-sign-out" onClick={handleSignOut} disabled={loading}>
            {loading ? 'Signing out...' : '🚪 Sign Out'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-panel">
        <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
        
        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-message">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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

          {isSignUp && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <p className="auth-toggle">
          {isSignUp ? 'Have an account? ' : "Don't have an account? "}
          <button
            type="button"
            className="link-btn"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setMessage('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}
