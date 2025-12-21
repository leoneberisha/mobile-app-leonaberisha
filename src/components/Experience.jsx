export function Experience({ data = [], onChange = () => {} }) {
  const handleAdd = () => {
    onChange([
      ...data,
      { id: Date.now(), title: '', years: '' }
    ])
  }

  const handleUpdate = (id, field, value) => {
    onChange(data.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleRemove = (id) => {
    onChange(data.filter(item => item.id !== id))
  }

  return (
    <div className="form-section">
      <h2>💼 Experience</h2>

      <div className="section-block">
        <div className="section-header">
          <button className="btn btn-primary" onClick={handleAdd}>
            + Add Experience
          </button>
        </div>

        <div className="skills-grid">
          {data.map((item) => (
            <div key={item.id} className="skill-item">
              <input
                type="text"
                placeholder="Experience title (e.g., Software Developer, Project Manager)"
                value={item.title || ''}
                onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                className="skill-input"
              />
              <input
                type="number"
                placeholder="Years"
                min="0"
                max="50"
                value={item.years || ''}
                onChange={(e) => handleUpdate(item.id, 'years', e.target.value)}
                className="years-input"
                style={{ width: '120px' }}
              />
              <button
                className="btn-danger--small"
                onClick={() => handleRemove(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
