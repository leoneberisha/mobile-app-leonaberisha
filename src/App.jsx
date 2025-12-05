import { useState, useEffect } from 'react'
import './App.css'
import { PersonalInfo } from './components/PersonalInfo'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { CVPreview } from './components/CVPreview'
import { CVDataTemplate, CVLayoutTemplates } from './templates'

function App() {
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

  return (
    <div className="app">
      <div className="header">
        <div className="header-top">
          <h1>📄 CV Builder</h1>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
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
                <CVPreview cvData={cvData} layout={cvLayout} />
              </div>
            </div>
            <button className="btn btn-primary btn-export" onClick={handleExportPDF}>
              🖨️ Print / Export as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
