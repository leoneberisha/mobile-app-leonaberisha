import { useState, useEffect } from 'react'
import './App.css'
import { PersonalInfo } from './components/PersonalInfo'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Auth } from './components/Auth'
import { CVPreview } from './components/CVPreview'
import { TemplateCustomizer } from './components/TemplateCustomizer'
import { CVDataTemplate, CVLayoutTemplates } from './templates'
import { getCurrentUser, getCVData, saveCVData } from './config/supabase'
import html2pdf from 'html2pdf.js'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

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

  const [theme, setThemeState] = useState(() => localStorage.getItem('theme') || 'light')
  
  const setTheme = (newTheme) => {
    try {
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
      setThemeState(newTheme)
    } catch {
      // ignore
    }
  }

  const [activeTab, setActiveTab] = useState('personal')
  const [cvLayout, setCvLayout] = useState(Object.keys(CVLayoutTemplates)[0] || 'modern')
  const [customization, setCustomization] = useState({
    accentColor: '#667eea',
    headingFont: 'Arial',
    bodyFont: 'Arial',
    textColor: '#222222'
  })
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
    const cvContent = document.querySelector('.cv-preview')
    if (!cvContent) return
    
    const cvName = cvData.personalInfo?.name || 'CV'
    const filename = `${cvName.replace(/\s+/g, '_')}_CV.pdf`
    
    const options = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    html2pdf().set(options).from(cvContent).save()
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
          <h1>📄 CV Builder</h1>
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
        <p className="subtitle">Create a professional resume in minutes</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          👤 Personal
        </button>
        <button 
          className={`tab ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          🎓 Education
        </button>
        <button 
          className={`tab ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          💼 Experience
        </button>
        <button 
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          ⭐ Skills
        </button>
        <button 
          className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          🚀 Projects
        </button>
        <button 
          className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          👁️ Preview
        </button>
      </div>

      <div className="content-area">
        {activeTab === 'personal' && (
          <PersonalInfo data={cvData.personalInfo} onChange={handlePersonalInfoChange} />
        )}
        
        {activeTab === 'education' && (
          <Education data={cvData.education} onChange={handleEducationChange} />
        )}
        
        {activeTab === 'experience' && (
          <Experience data={cvData.experience} onChange={handleExperienceChange} />
        )}
        
        {activeTab === 'skills' && (
          <Skills
            skills={cvData.skills}
            languages={cvData.languages}
            interests={cvData.interests}
            onSkillsChange={handleSkillsChange}
            onLanguagesChange={handleLanguagesChange}
            onInterestsChange={handleInterestsChange}
          />
        )}
        
        {activeTab === 'projects' && (
          <Projects data={cvData.projects} onChange={handleProjectsChange} />
        )}

        {activeTab === 'personal' && (
          <TemplateCustomizer customization={customization} onChange={setCustomization} />
        )}
        
        {activeTab === 'preview' && (
          <div className="preview-section">
            <div className="preview-controls">
              <button className="btn btn-primary" onClick={() => setCvData(CVDataTemplate)}>Load Sample CV</button>
              <button className="btn btn-primary" onClick={() => setCvData({ personalInfo: { name: '', email: '', phone: '', location: '', summary: '' }, education: [], experience: [], skills: [] })}>Start Blank</button>
              <div className="layout-control">
                <label className="layout-label">Layout</label>
                <select value={cvLayout} onChange={(e) => setCvLayout(e.target.value)} className="layout-select">
                  {Object.entries(CVLayoutTemplates).map(([key, meta]) => (
                    <option key={key} value={key}>{meta.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="preview-frame">
              <div className="preview-card">
                <CVPreview cvData={cvData} layout={cvLayout} customization={customization} />
              </div>
            </div>
            <button className="btn btn-primary btn-export" onClick={handleExportPDF}>
              💾 Save as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
