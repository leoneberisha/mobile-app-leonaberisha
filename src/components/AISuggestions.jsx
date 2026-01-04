import { useState } from 'react'
import { generateCVSuggestions } from '../lib/aiHelper'

export function AISuggestions({ cvData }) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const analyzCV = async () => {
    setLoading(true)
    setShowSuggestions(true)
    try {
      const results = await generateCVSuggestions(cvData)
      setSuggestions(results)
    } catch (error) {
      console.error('Error analyzing CV:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIconForType = (type) => {
    switch (type) {
      case 'error': return '❌'
      case 'warning': return '⚠️'
      case 'tip': return '💡'
      case 'success': return '✅'
      default: return '💬'
    }
  }

  const getColorForType = (type) => {
    switch (type) {
      case 'error': return '#ff5252'
      case 'warning': return '#ffa726'
      case 'tip': return '#42a5f5'
      case 'success': return '#66bb6a'
      default: return '#aaa'
    }
  }

  return (
    <div className="form-section">
      <h2>🤖 AI CV Analysis</h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <button 
          className="btn btn-primary" 
          onClick={analyzCV}
          disabled={loading}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          🤖 {loading ? 'Analyzing...' : 'Get AI Suggestions'}
        </button>
        {showSuggestions && (
          <button 
            className="btn" 
            onClick={() => setShowSuggestions(!showSuggestions)}
            style={{ background: 'var(--card-bg)' }}
          >
            {showSuggestions ? 'Hide' : 'Show'} Suggestions
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>
            AI Analysis Results ({suggestions.length})
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {suggestions.map((suggestion, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '1rem',
                  background: 'var(--page-bg)',
                  borderLeft: `4px solid ${getColorForType(suggestion.type)}`,
                  borderRadius: '4px'
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem' }}>{getIconForType(suggestion.type)}</span>
                  <div>
                    <strong style={{ color: getColorForType(suggestion.type) }}>
                      {suggestion.section}
                    </strong>
                    <p style={{ margin: '0.5rem 0 0', lineHeight: '1.5' }}>
                      {suggestion.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: 'rgba(66, 165, 245, 0.1)',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            <strong>💡 Pro Tip:</strong> Address the errors and warnings first, then implement the tips for maximum impact.
          </div>
        </div>
      )}
    </div>
  )
}
