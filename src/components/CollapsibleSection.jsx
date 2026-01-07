import { useState } from 'react'

export function CollapsibleSection({ title, icon, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="collapsible-section">
      <button 
        className="section-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="section-title">
          <span className="section-icon">{icon}</span>
          {title}
        </span>
        <span className={`chevron ${isOpen ? 'open' : ''}`}>⌃</span>
      </button>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  )
}
