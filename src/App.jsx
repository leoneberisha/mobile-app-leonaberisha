import { useState, useEffect } from 'react'
import './App.css'
import { PersonalInfo } from './components/PersonalInfo'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Auth } from './components/Auth'
import { CVPreview } from './components/CVPreview'
import { AISuggestions } from './components/AISuggestions'
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

  const [activeTab, setActiveTab] = useState('personal')
  const [cvLayout, setCvLayout] = useState(Object.keys(CVLayoutTemplates)[0] || 'modern')
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

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(cvData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${cvData.personalInfo?.name || 'CV'}_data.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImportJSON = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result)
        // Validate the structure
        if (importedData.personalInfo || importedData.education || importedData.experience) {
          setCvData(importedData)
          alert('✅ CV data imported successfully!')
        } else {
          alert('❌ Invalid CV data format')
        }
      } catch (error) {
        console.error('Import error:', error)
        alert('❌ Failed to import CV data. Please check the file format.')
      }
    }
    reader.readAsText(file)
    // Reset input so the same file can be selected again
    event.target.value = ''
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
          className={`tab ${activeTab === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          🤖 AI Help
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

        {activeTab === 'ai' && (
          <AISuggestions cvData={cvData} />
        )}
        
        {activeTab === 'preview' && (
          <div className="preview-section">
            <div className="preview-controls">
              <button className="btn btn-primary" onClick={() => setCvData(CVDataTemplate)}>Load Sample CV</button>
              <button className="btn btn-primary" onClick={() => setCvData({ personalInfo: { name: '', email: '', phone: '', location: '', summary: '' }, education: [], experience: [], skills: [], languages: [], interests: [], projects: [] })}>Start Blank</button>
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
                <CVPreview cvData={cvData} layout={cvLayout} />
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
