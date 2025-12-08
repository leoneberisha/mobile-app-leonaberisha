export function Skills({
  skills = [],
  languages = [],
  interests = [],
  onSkillsChange = () => {},
  onLanguagesChange = () => {},
  onInterestsChange = () => {}
}) {
  // Skills handlers
  const handleAddSkill = () => {
    onSkillsChange([
      ...skills,
      { id: Date.now(), name: '', level: 'intermediate' }
    ])
  }

  const handleUpdateSkill = (id, field, value) => {
    onSkillsChange(skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    ))
  }

  const handleRemoveSkill = (id) => {
    onSkillsChange(skills.filter(skill => skill.id !== id))
  }

  // Language handlers
  const handleAddLanguage = () => {
    onLanguagesChange([
      ...languages,
      { id: Date.now(), name: '', level: 'beginner' }
    ])
  }

  const handleUpdateLanguage = (id, field, value) => {
    onLanguagesChange(languages.map(lang =>
      lang.id === id ? { ...lang, [field]: value } : lang
    ))
  }

  const handleRemoveLanguage = (id) => {
    onLanguagesChange(languages.filter(lang => lang.id !== id))
  }

  // Interest handlers
  const handleAddInterest = () => {
    onInterestsChange([
      ...interests,
      { id: Date.now(), name: '' }
    ])
  }

  const handleUpdateInterest = (id, value) => {
    onInterestsChange(interests.map(int =>
      int.id === id ? { ...int, name: value } : int
    ))
  }

  const handleRemoveInterest = (id) => {
    onInterestsChange(interests.filter(int => int.id !== id))
  }

  return (
    <div className="form-section">
      <h2>⭐ Skills & Languages</h2>

      {/* Skills */}
      <div className="section-block">
        <div className="section-header">
          <h3>Skills</h3>
          <button className="btn btn-primary" onClick={handleAddSkill}>
            + Add Skill
          </button>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
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
      </div>

      {/* Languages */}
      <div className="section-block">
        <div className="section-header">
          <h3>Languages</h3>
          <button className="btn btn-primary" onClick={handleAddLanguage}>
            + Add Language
          </button>
        </div>

        <div className="skills-grid">
          {languages.map((lang) => (
            <div key={lang.id} className="skill-item">
              <input
                type="text"
                placeholder="e.g., English, Spanish"
                value={lang.name || ''}
                onChange={(e) => handleUpdateLanguage(lang.id, 'name', e.target.value)}
                className="skill-input"
              />
              <select
                value={lang.level || 'beginner'}
                onChange={(e) => handleUpdateLanguage(lang.id, 'level', e.target.value)}
                className="skill-level"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="native">Native</option>
              </select>
              <button
                className="btn-danger--small"
                onClick={() => handleRemoveLanguage(lang.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="section-block">
        <div className="section-header">
          <h3>Interests</h3>
          <button className="btn btn-primary" onClick={handleAddInterest}>
            + Add Interest
          </button>
        </div>

        <div className="skills-grid">
          {interests.map((interest) => (
            <div key={interest.id} className="skill-item">
              <input
                type="text"
                placeholder="e.g., Photography, Hiking"
                value={interest.name || ''}
                onChange={(e) => handleUpdateInterest(interest.id, e.target.value)}
                className="skill-input"
              />
              <button
                className="btn-danger--small"
                onClick={() => handleRemoveInterest(interest.id)}
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
