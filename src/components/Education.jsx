export function Education({ data, onChange }) {
  const handleAddEducation = () => {
    onChange([...data, {
      id: Date.now(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }])
  }

  const handleUpdateEducation = (id, field, value) => {
    onChange(data.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ))
  }

  const handleRemoveEducation = (id) => {
    onChange(data.filter(edu => edu.id !== id))
  }

  return (
    <div className="form-section">
      <h2>🎓 Education</h2>

      {data.map((edu) => (
        <div key={edu.id} className="entry-card">
          <div className="form-group">
            <label>School/University *</label>
            <input
              type="text"
              placeholder="University Name"
              value={edu.school || ''}
              onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Degree *</label>
              <input
                type="text"
                placeholder="Bachelor of Science"
                value={edu.degree || ''}
                onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                placeholder="Computer Science"
                value={edu.field || ''}
                onChange={(e) => handleUpdateEducation(edu.id, 'field', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={edu.startDate || ''}
                onChange={(e) => handleUpdateEducation(edu.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={edu.endDate || ''}
                onChange={(e) => handleUpdateEducation(edu.id, 'endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Relevant coursework, honors, etc."
              value={edu.description || ''}
              onChange={(e) => handleUpdateEducation(edu.id, 'description', e.target.value)}
              rows="3"
            />
          </div>

          <button className="btn-remove" onClick={() => handleRemoveEducation(edu.id)}>
            Remove
          </button>
        </div>
      ))}

      <button className="btn-add" onClick={handleAddEducation}>
        + Add Education
      </button>
    </div>
  )
}
