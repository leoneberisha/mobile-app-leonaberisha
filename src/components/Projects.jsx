import { useState } from 'react'

export function Projects({ data = [], onChange }) {
  const [projects, setProjects] = useState(data)

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: ''
    }
    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    onChange(updatedProjects)
  }

  const removeProject = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id)
    setProjects(updatedProjects)
    onChange(updatedProjects)
  }

  const updateProject = (id, field, value) => {
    const updatedProjects = projects.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    )
    setProjects(updatedProjects)
    onChange(updatedProjects)
  }

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Personal Projects</h2>
        <button className="btn btn-primary" onClick={addProject}>
          ➕ Add Project
        </button>
      </div>

      <div className="entries-list">
        {projects.length === 0 ? (
          <p className="empty-state">No projects added yet. Click "Add Project" to get started.</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="entry-card">
              <div className="entry-header">
                <h3>Project Entry</h3>
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => removeProject(project.id)}
                >
                  🗑️ Remove
                </button>
              </div>

              <div className="form-group">
                <label htmlFor={`project-name-${project.id}`}>Project Name *</label>
                <input
                  id={`project-name-${project.id}`}
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  placeholder="e.g., Portfolio Website"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`project-description-${project.id}`}>Description</label>
                <textarea
                  id={`project-description-${project.id}`}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Brief description of the project..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`project-technologies-${project.id}`}>Technologies Used</label>
                <input
                  id={`project-technologies-${project.id}`}
                  type="text"
                  value={project.technologies}
                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
