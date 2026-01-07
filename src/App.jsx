import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { PersonalInfo } from './components/PersonalInfo'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Auth } from './components/Auth'
import { CVPreview } from './components/CVPreview'
import { AISuggestions } from './components/AISuggestions'
import { CollapsibleSection } from './components/CollapsibleSection'
import { CVDataTemplate, CVLayoutTemplates } from './templates'
import { getCurrentUser, getCVData, saveCVData } from './config/supabase'
import html2pdf from 'html2pdf.js'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

  // Check auth status on mount - skip auth, use local mode
  useEffect(() => {
    // Check if user manually signed out
    const signedOut = localStorage.getItem('signed_out')
    if (signedOut === 'true') {
      setUser(null)
      setLoading(false)
      return
    }
    
    // Auto-login as local user for offline mode
    const userEmail = localStorage.getItem('user_email') || 'guest@example.com'
    setUser({ id: 'local-user', email: userEmail })
    
    // Load CV data from localStorage
    try {
      const stored = localStorage.getItem('cv_data')
      if (stored) {
        setCvData(JSON.parse(stored))
      }
    } catch (err) {
      console.error('Error loading local CV data:', err)
    }
    
    setLoading(false)
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

  const [cvLayout, setCvLayout] = useState(Object.keys(CVLayoutTemplates)[0] || 'modern')
  const [activeTab, setActiveTab] = useState('personal')
  const [cvData, setCvData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    education: [],
    experience: [],
    skills: [],
    languages: [],
    interests: [],
    projects: []
  })

  // Auto-save CV data to localStorage
  useEffect(() => {
    if (!user) return

    const autoSave = () => {
      try {
        localStorage.setItem('cv_data', JSON.stringify(cvData))
        setSyncing(true)
        setTimeout(() => setSyncing(false), 500)
      } catch (error) {
        console.error('Error saving CV data:', error)
      }
    }

    // Debounce auto-save (only save after 1 second of inactivity)
    const saveTimer = setTimeout(autoSave, 1000)
    return () => clearTimeout(saveTimer)
  }, [cvData, user])

  const handlePersonalInfoChange = (data) => {
    setCvData({ ...cvData, personalInfo: data })
  }

  const handleEducationChange = (data) => {
    setCvData({ ...cvData, education: data })
  }

  const handleExperienceChange = (data) => {
    setCvData({ ...cvData, experience: data })
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

  const handleProjectsChange = (data) => {
    setCvData({ ...cvData, projects: data })
  }

  const handleExportPDF = () => {
    // Create a hidden container with the preview
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.width = '210mm'
    
    // Temporarily add to DOM
    document.body.appendChild(container)
    
    // Create a temporary React root to render CVPreview
    import('react-dom/client').then(({ createRoot }) => {
      const root = createRoot(container)
      root.render(
        <div className="cv-preview">
          <CVPreview cvData={cvData} layout={cvLayout} />
        </div>
      )
      
      // Wait for render to complete, then export
      setTimeout(() => {
        const cvContent = container.querySelector('.cv-preview')
        if (!cvContent) {
          document.body.removeChild(container)
          return
        }
        
        const cvName = cvData.personalInfo?.name || 'CV'
        const filename = `${cvName.replace(/\s+/g, '_')}_CV.pdf`
        
        const options = {
          margin: 10,
          filename: filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }
        
        html2pdf().set(options).from(cvContent).save().finally(() => {
          root.unmount()
          document.body.removeChild(container)
        })
      }, 500)
    })
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

  // Show auth screen if signed out
  if (!user) {
    return <Auth user={user} onAuthChange={() => window.location.reload()} />
  }

  return (
    <div className="app">
      {/* Top Bar */}
      <div className="topbar">
        <div className="brand">
          <span className="brand-mark">📄</span>
          <span className="brand-name">CV Builder</span>
        </div>
        <div className="topbar-actions">
          {syncing && <span className="saving-pill">Saving…</span>}
          <button className="ghost" onClick={() => setCvData(CVDataTemplate)}>Load Sample</button>
          <button className="ghost" onClick={() => setCvData({ personalInfo: { name: '', email: '', phone: '', location: '', summary: '' }, education: [], experience: [], skills: [], languages: [], interests: [], projects: [] })}>Start Blank</button>
          <div className="divider" />
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Auth user={user} onAuthChange={() => window.location.reload()} />
          <button className="primary" onClick={handleExportPDF}>💾 Save as PDF</button>
        </div>
      </div>

      {/* Single Page Layout */}
      <div className="single-page-layout">
        <div className="form-container">
          <div className="page-title">Enter Your Information</div>
          
          <CollapsibleSection title="Personal Information" icon="👤">
            <PersonalInfo data={cvData.personalInfo} onChange={handlePersonalInfoChange} />
          </CollapsibleSection>

          <CollapsibleSection title="Education" icon="🎓" defaultOpen={false}>
            <Education data={cvData.education} onChange={handleEducationChange} />
          </CollapsibleSection>

          <CollapsibleSection title="Work Experience" icon="💼" defaultOpen={false}>
            <Experience data={cvData.experience} onChange={handleExperienceChange} />
          </CollapsibleSection>

          <CollapsibleSection title="Skills & Languages" icon="⭐" defaultOpen={false}>
            <Skills
              skills={cvData.skills}
              languages={cvData.languages}
              interests={cvData.interests}
              onSkillsChange={handleSkillsChange}
              onLanguagesChange={handleLanguagesChange}
              onInterestsChange={handleInterestsChange}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Projects" icon="🚀" defaultOpen={false}>
            <Projects data={cvData.projects} onChange={handleProjectsChange} />
          </CollapsibleSection>

          <CollapsibleSection title="AI Suggestions" icon="🤖" defaultOpen={false}>
            <AISuggestions cvData={cvData} />
          </CollapsibleSection>

          <div className="layout-bar">
            <label>Preview Layout</label>
            <select value={cvLayout} onChange={(e) => setCvLayout(e.target.value)}>
              {Object.entries(CVLayoutTemplates).map(([key, meta]) => (
                <option key={key} value={key}>{meta.name}</option>
              ))}
            </select>
          </div>

          <button className="primary btn-preview" onClick={() => setActiveTab('preview')}>👁️ View Preview</button>
        </div>

        {activeTab === 'preview' && (
          <aside className="preview-modal">
            <button className="close-preview" onClick={() => setActiveTab('personal')}>✕</button>
            <div className="preview-card">
              <CVPreview cvData={cvData} layout={cvLayout} />
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

export default App
