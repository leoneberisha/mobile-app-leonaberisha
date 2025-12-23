import { useState, useEffect } from 'react'
import './App.css'
import { PersonalInfo } from './components/PersonalInfo'
import { Education } from './components/Education'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Auth } from './components/Auth'
import { getCurrentUser, getCVData, saveCVData } from './config/supabase'
import { generateCVOffline } from './lib/cvGenerator'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generatedCV, setGeneratedCV] = useState(null)
  const [cvError, setCvError] = useState(null)

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user: authUser, error } = await getCurrentUser()
        if (error) {
          console.error('Auth error:', error)
        }
        setUser(authUser)
        
        if (authUser) {
          // Load CV data from Supabase
          const { data: cvRecord, error: fetchError } = await getCVData(authUser.id)
          if (fetchError) {
            console.error('Error loading CV:', fetchError)
          } else if (cvRecord?.data) {
            setCvData(cvRecord.data)
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const [theme, setThemeState] = useState(() => localStorage.getItem('theme') || 'dark')
  
  const setTheme = (newTheme) => {
    try {
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
      setThemeState(newTheme)
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  const [cvData, setCvData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    education: [],
    skills: [],
    languages: [],
    interests: [],
    experience: []
  })

  // Auto-save CV data to Supabase
  useEffect(() => {
    if (!user) return

    const autoSave = async () => {
      setSyncing(true)
      const { error } = await saveCVData(user.id, cvData)
      setSyncing(false)
      if (error) {
        console.error('Error saving CV data:', error)
      }
    }

    // Debounce auto-save (only save after 2 seconds of inactivity)
    const saveTimer = setTimeout(autoSave, 2000)
    return () => clearTimeout(saveTimer)
  }, [cvData, user])

  const handlePersonalInfoChange = (data) => {
    setCvData({ ...cvData, personalInfo: data })
  }

  const handleEducationChange = (data) => {
    setCvData({ ...cvData, education: data })
  }

  const handleSkillsChange = (data) => {
    setCvData({ ...cvData, skills: data })
  }

  const handleLanguagesChange = (data) => {
    setCvData({ ...cvData, languages: data })
  }

  const handleInterestsChange = (data) => {
    setCvData({ ...cvData, interests: data })
  }

  const handleExperienceChange = (data) => {
    setCvData({ ...cvData, experience: data })
  }

  const handleGenerateCV = () => {
    setCvError(null)
    setGenerating(true)
    try {
      const result = generateCVOffline({
        name: cvData.personalInfo.name,
        email: cvData.personalInfo.email,
        phone: cvData.personalInfo.phone,
        location: cvData.personalInfo.location,
        personalSummary: cvData.personalInfo.summary,
        education: cvData.education,
        skills: cvData.skills,
        experience: cvData.experience
      })
      setGeneratedCV(result.text)
      
      // Open in new tab with formatted HTML
      const blob = new Blob([result.html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
      setTimeout(() => URL.revokeObjectURL(url), 30000)
    } catch (error) {
      setCvError(error.message || 'Failed to generate CV')
      console.error('CV Generation Error:', error)
    } finally {
      setGenerating(false)
    }
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--page-bg)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Loading your CV Builder...
      </div>
    )
  }

  // Show auth screen if not logged in
  if (!user) {
    return <Auth user={user} onAuthChange={() => window.location.reload()} />
  }

  return (
    <div className="app">
      <div className="header">
        <div className="header-top">
          <h1>📄 AI CV Builder</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: 'auto' }}>
            {syncing && <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>💾 Saving...</span>}
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Auth user={user} onAuthChange={() => window.location.reload()} />
          </div>
        </div>
        <p className="subtitle">Build a professional CV powered by AI in minutes</p>
      </div>

      <div className="content-area" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Personal Information Section */}
        <PersonalInfo data={cvData.personalInfo} onChange={handlePersonalInfoChange} />

        {/* Education Section */}
        <Education data={cvData.education} onChange={handleEducationChange} />

        {/* Skills Section */}
        <Skills
          skills={cvData.skills}
          languages={cvData.languages}
          interests={cvData.interests}
          onSkillsChange={handleSkillsChange}
          onLanguagesChange={handleLanguagesChange}
          onInterestsChange={handleInterestsChange}
        />

        {/* Experience Section */}
        <Experience
          data={cvData.experience}
          onChange={handleExperienceChange}
        />

        {/* Generate CV Section */}
        <div className="form-section" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0 }}>🚀 Generate Professional CV</h2>
            <button 
              className="btn btn-primary" 
              onClick={handleGenerateCV}
              disabled={generating || !cvData.personalInfo.name}
              style={{ opacity: generating || !cvData.personalInfo.name ? 0.6 : 1, cursor: generating ? 'not-allowed' : 'pointer' }}
            >
              {generating ? '⏳ Generating...' : '✨ Generate CV'}
            </button>
          </div>

          {cvError && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#ffebee',
              color: '#c62828',
              borderRadius: '8px',
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              ❌ {cvError}
            </div>
          )}

          {generatedCV && (
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--input-bg)',
              borderRadius: '8px',
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)'
            }}>
              ✅ CV generated successfully! Opening in a new tab...
            </div>
          )}

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            ℹ️ Powered by intelligent rule-based generation (no API needed). Fill in your details and click "Generate CV" to create a professional, job-market-ready CV.
          </p>
        </div>
      </div>
    </div>
  )

}

export default App
