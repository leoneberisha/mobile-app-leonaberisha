import { useState, useEffect, useContext } from 'react'
import './App.css'
import { PersonalInfo } from './components/PersonalInfo'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { CVPreview } from './components/CVPreview'
import { Auth } from './components/Auth'
import { CVDataTemplate, CVLayoutTemplates } from './templates'
import { AuthContext } from './context/AuthContext'
import { saveCVToSupabase, loadCVFromSupabase } from './lib/cvService'

function App() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const [saveMessage, setSaveMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  // Load user's saved CV when they log in
  useEffect(() => {
    if (user && !authLoading) {
      const loadUserCV = async () => {
        const { data, error } = await loadCVFromSupabase(user.id)
        if (data) {
          setCvData(data)
          setCvLayout(data.layout || 'modern')
        }
        if (error) console.warn('Could not load saved CV:', error)
      }
      loadUserCV()
    }
  }, [user, authLoading])

  const [activeTab, setActiveTab] = useState('personal')
  const [cvLayout, setCvLayout] = useState('modern')
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
    skills: []
  })

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

  const handleExportPDF = () => {
    const cvContent = document.querySelector('.cv-preview')
    if (!cvContent) return
    
    const printWindow = window.open('', '_blank')
    printWindow.document.write(cvContent.innerHTML)
    printWindow.document.close()
    printWindow.print()
  }

  const handleSaveCV = async () => {
    if (!user) {
      setSaveMessage('Please sign in to save your CV')
      return
    }

    setIsSaving(true)
    setSaveMessage('')

    const { error } = await saveCVToSupabase(user.id, cvData, cvLayout)
    
    if (error) {
      setSaveMessage(`Error saving: ${error}`)
    } else {
      setSaveMessage('✅ CV saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    }
    setIsSaving(false)
  }

  const handleLoadTemplate = (loadSampleData) => {
    if (loadSampleData) {
      setCvData(JSON.parse(JSON.stringify(CVDataTemplate)))
      setActiveTab('personal')
    } else {
      // Blank template
      setCvData({
        personalInfo: { name: '', email: '', phone: '', location: '', summary: '' },
        education: [],
        experience: [],
        skills: []
      })
      setActiveTab('personal')
    }
  }

  // Show auth UI if not logged in
  if (authLoading) {
    return <div className="app" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
  }

  if (!user) {
    return (
      <div className="app auth-app">
        <div className="header">
          <div className="header-top">
            <h1>📄 CV Builder</h1>
          </div>
          <p className="subtitle">Create a professional resume in minutes</p>
        </div>
        <Auth />
      </div>
    )
  }

  return (
    <div className="app">
      <div className="header">
        <div className="header-top">
          <h1>📄 CV Builder</h1>
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <span className="user-info">👤 {user.email}</span>
          </div>
        </div>
        <p className="subtitle">Create a professional resume in minutes</p>
      </div>

      <div className="template-selector">
        <label htmlFor="template-select">📋 Load sample data:</label>
        <button
          className="btn-template"
          onClick={() => handleLoadTemplate(true)}
        >
          📝 Load Sample CV
        </button>
        <button
          className="btn-template"
          onClick={() => handleLoadTemplate(false)}
        >
          ✨ Start Blank
        </button>
      </div>

      <div className="layout-selector">
        <label htmlFor="layout-select">🎨 CV Layout:</label>
        <select
          id="layout-select"
          className="layout-select"
          value={cvLayout}
          onChange={(e) => setCvLayout(e.target.value)}
        >
          <option value="modern">Modern Design</option>
          <option value="classic">Classic Layout</option>
          <option value="minimal">Minimal Style</option>
          <option value="twoColumn">Two-Column Layout</option>
        </select>
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
          <Skills data={cvData.skills} onChange={handleSkillsChange} />
        )}
        
        {activeTab === 'preview' && (
          <div>
            <CVPreview cvData={cvData} layout={cvLayout} />
            <div className="preview-actions">
              <button className="btn-export" onClick={handleExportPDF}>
                🖨️ Print / Export as PDF
              </button>
              <button className="btn-save" onClick={handleSaveCV} disabled={isSaving}>
                {isSaving ? '💾 Saving...' : '💾 Save CV to Supabase'}
              </button>
            </div>
            {saveMessage && <p className="save-message">{saveMessage}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
