export function Skills({ data, onChange }) {
  const handleAddSkill = () => {
    onChange([...data, {
      id: Date.now(),
      name: '',
      level: 'intermediate'
    }])
  }

  const handleUpdateSkill = (id, field, value) => {
    onChange(data.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    ))
  }

  const handleRemoveSkill = (id) => {
    onChange(data.filter(skill => skill.id !== id))
  }

  return (
    <div className="form-section">
      <h2>⭐ Skills</h2>

      <div className="skills-grid">
        {data.map((skill) => (
          <div key={skill.id} className="skill-item">
            <input
              type="text"
              placeholder="e.g., React, Python, Leadership"
              value={skill.name || ''}
              onChange={(e) => handleUpdateSkill(skill.id, 'name', e.target.value)}
              className="skill-input"
            />
            <select
              value={skill.level || 'intermediate'}
              onChange={(e) => handleUpdateSkill(skill.id, 'level', e.target.value)}
              className="skill-level"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
            <button 
              className="btn-danger--small"
              onClick={() => handleRemoveSkill(skill.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={handleAddSkill}>
        + Add Skill
      </button>
    </div>
  )
}
