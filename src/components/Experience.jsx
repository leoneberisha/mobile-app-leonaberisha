export function Experience({ data, onChange }) {
  const handleAddExperience = () => {
    onChange([...data, {
      id: Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    }])
  }

  const handleUpdateExperience = (id, field, value) => {
    onChange(data.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  const handleRemoveExperience = (id) => {
    onChange(data.filter(exp => exp.id !== id))
  }

  return (
    <div className="form-section">
      <h2>💼 Work Experience</h2>

      {data.map((exp) => (
        <div key={exp.id} className="entry-card">
          <div className="form-row">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                placeholder="Senior Developer"
                value={exp.jobTitle || ''}
                onChange={(e) => handleUpdateExperience(exp.id, 'jobTitle', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                placeholder="Company Name"
                value={exp.company || ''}
                onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="City, State"
              value={exp.location || ''}
              onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={exp.startDate || ''}
                onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={exp.endDate || ''}
                onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.currentlyWorking}
              />
            </div>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id={`current-${exp.id}`}
              checked={exp.currentlyWorking || false}
              onChange={(e) => handleUpdateExperience(exp.id, 'currentlyWorking', e.target.checked)}
            />
            <label htmlFor={`current-${exp.id}`}>I currently work here</label>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Key responsibilities and achievements..."
              value={exp.description || ''}
              onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
              rows="4"
            />
          </div>

          <button className="btn btn-danger" onClick={() => handleRemoveExperience(exp.id)}>
            Remove
          </button>
        </div>
      ))}

      <button className="btn btn-primary" onClick={handleAddExperience}>
        + Add Experience
      </button>
    </div>
  )
}
