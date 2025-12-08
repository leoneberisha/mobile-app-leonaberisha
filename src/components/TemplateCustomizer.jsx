export function TemplateCustomizer({ customization = {}, onChange = () => {} }) {
  const handleColorChange = (key, value) => {
    onChange({
      ...customization,
      [key]: value
    })
  }

  const handleFontChange = (key, value) => {
    onChange({
      ...customization,
      [key]: value
    })
  }

  const defaultCustomization = {
    accentColor: '#667eea',
    headingFont: 'Arial',
    bodyFont: 'Arial',
    textColor: '#222222'
  }

  const current = { ...defaultCustomization, ...customization }

  return (
    <div className="customizer-section">
      <h3>🎨 Customize Template</h3>
      
      <div className="customizer-grid">
        {/* Colors */}
        <div className="customizer-group">
          <label>Accent Color</label>
          <div className="color-picker-group">
            <input
              type="color"
              value={current.accentColor}
              onChange={(e) => handleColorChange('accentColor', e.target.value)}
              className="color-picker"
            />
            <span className="color-value">{current.accentColor}</span>
          </div>
        </div>

        <div className="customizer-group">
          <label>Text Color</label>
          <div className="color-picker-group">
            <input
              type="color"
              value={current.textColor}
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="color-picker"
            />
            <span className="color-value">{current.textColor}</span>
          </div>
        </div>

        {/* Fonts */}
        <div className="customizer-group">
          <label>Heading Font</label>
          <select
            value={current.headingFont}
            onChange={(e) => handleFontChange('headingFont', e.target.value)}
            className="font-select"
          >
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
          </select>
        </div>

        <div className="customizer-group">
          <label>Body Font</label>
          <select
            value={current.bodyFont}
            onChange={(e) => handleFontChange('bodyFont', e.target.value)}
            className="font-select"
          >
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
          </select>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => onChange(defaultCustomization)}
      >
        🔄 Reset to Defaults
      </button>
    </div>
  )
}
