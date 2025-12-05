export function PersonalInfo({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    })
  }

  return (
    <div className="form-section">
      <h2>👤 Personal Information</h2>
      
      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          placeholder="John Doe"
          value={data.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          placeholder="john@example.com"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={data.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          placeholder="City, State"
          value={data.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Professional Summary</label>
        <textarea
          placeholder="Brief overview of your professional background..."
          value={data.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          rows="4"
        />
      </div>
    </div>
  )
}
