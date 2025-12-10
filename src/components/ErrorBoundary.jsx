import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'var(--page-bg)',
          color: 'var(--text-color)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'var(--app-bg)',
            padding: '3rem',
            borderRadius: '12px',
            maxWidth: '600px',
            border: '2px solid var(--border)'
          }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>😢 Oops!</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--muted)' }}>
              Something went wrong
            </h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>
              We apologize for the inconvenience. The application encountered an unexpected error.
            </p>
            {this.state.error && (
              <details style={{
                marginBottom: '2rem',
                textAlign: 'left',
                background: 'var(--card-bg)',
                padding: '1rem',
                borderRadius: '6px',
                border: '1px solid var(--border)'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Error Details
                </summary>
                <pre style={{
                  fontSize: '0.85rem',
                  overflow: 'auto',
                  color: '#ff5252',
                  fontFamily: 'monospace'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, var(--accent-start), var(--accent-end))',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              🔄 Reload Application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
