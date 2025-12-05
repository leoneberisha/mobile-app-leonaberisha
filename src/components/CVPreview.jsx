export function CVPreview({ cvData, layout }) {
  const layoutClass = layout ? layout.replace(/([A-Z])/g, '-$1').toLowerCase() : ''
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const [year, month] = dateStr.split('-')
    const date = new Date(year, month - 1)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  // For the two-column layout we render a two-column grid; otherwise fall back to a single-column preview
  const isTwo = layoutClass === 'two-column'

  if (isTwo) {
    return (
      <div className={`cv-preview ${layoutClass}`}>
        <div className="cv-grid">
          <aside className="cv-left">
            <div className="cv-header">
              <h1>{cvData.personalInfo?.name || 'Your Name'}</h1>
              <div className="contact-info">
                {cvData.personalInfo?.email && <span>{cvData.personalInfo.email}</span>}
                {cvData.personalInfo?.phone && <span>•</span>}
                {cvData.personalInfo?.phone && <span>{cvData.personalInfo.phone}</span>}
                {cvData.personalInfo?.location && <span>•</span>}
                {cvData.personalInfo?.location && <span>{cvData.personalInfo.location}</span>}
              </div>
            </div>

            {cvData.personalInfo?.summary && (
              <div className="cv-section">
                <h3>Professional Summary</h3>
                <p>{cvData.personalInfo.summary}</p>
              </div>
            )}

            {cvData.skills?.length > 0 && (
              <div className="cv-section">
                <h3>Skills</h3>
                <div className="skills-list">
                  {cvData.skills.map((skill) => (
                    <span key={skill.id} className={`skill-badge level-${skill.level}`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <main className="cv-main">
            {cvData.experience?.length > 0 && (
              <div className="cv-section">
                <h3>Work Experience</h3>
                {cvData.experience.map((exp) => (
                  <div key={exp.id} className="cv-entry">
                    <div className="cv-entry-header">
                      <div>
                        <h4>{exp.jobTitle}</h4>
                        <p className="company">{exp.company}</p>
                      </div>
                      <div className="dates">
                        {exp.startDate && (
                          <>
                            <span>{formatDate(exp.startDate)}</span>
                            {exp.endDate && <span>–</span>}
                            {exp.endDate && <span>{formatDate(exp.endDate)}</span>}
                            {exp.currentlyWorking && <span>– Present</span>}
                          </>
                        )}
                      </div>
                    </div>
                    {exp.location && <p className="location">{exp.location}</p>}
                    {exp.description && <p className="description">{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {cvData.education?.length > 0 && (
              <div className="cv-section">
                <h3>Education</h3>
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="cv-entry">
                    <div className="cv-entry-header">
                      <div>
                        <h4>{edu.degree}</h4>
                        <p className="school">{edu.school}</p>
                      </div>
                      <div className="dates">
                        {edu.startDate && (
                          <>
                            <span>{formatDate(edu.startDate)}</span>
                            {edu.endDate && <span>–</span>}
                            {edu.endDate && <span>{formatDate(edu.endDate)}</span>}
                          </>
                        )}
                      </div>
                    </div>
                    {edu.field && <p className="field">{edu.field}</p>}
                    {edu.description && <p className="description">{edu.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    )
  }
  return (
    <div className={`cv-preview ${layoutClass}`}>
      {/* Header */}
      <div className="cv-header">
        <h1>{cvData.personalInfo?.name || 'Your Name'}</h1>
        <div className="contact-info">
          {cvData.personalInfo?.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo?.phone && <span>•</span>}
          {cvData.personalInfo?.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo?.location && <span>•</span>}
          {cvData.personalInfo?.location && <span>{cvData.personalInfo.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {cvData.personalInfo?.summary && (
        <div className="cv-section">
          <h3>Professional Summary</h3>
          <p>{cvData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience?.length > 0 && (
        <div className="cv-section">
          <h3>Work Experience</h3>
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="cv-entry">
              <div className="cv-entry-header">
                <div>
                  <h4>{exp.jobTitle}</h4>
                  <p className="company">{exp.company}</p>
                </div>
                <div className="dates">
                  {exp.startDate && (
                    <>
                      <span>{formatDate(exp.startDate)}</span>
                      {exp.endDate && <span>–</span>}
                      {exp.endDate && <span>{formatDate(exp.endDate)}</span>}
                      {exp.currentlyWorking && <span>– Present</span>}
                    </>
                  )}
                </div>
              </div>
              {exp.location && <p className="location">{exp.location}</p>}
              {exp.description && <p className="description">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cvData.education?.length > 0 && (
        <div className="cv-section">
          <h3>Education</h3>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="cv-entry">
              <div className="cv-entry-header">
                <div>
                  <h4>{edu.degree}</h4>
                  <p className="school">{edu.school}</p>
                </div>
                <div className="dates">
                  {edu.startDate && (
                    <>
                      <span>{formatDate(edu.startDate)}</span>
                      {edu.endDate && <span>–</span>}
                      {edu.endDate && <span>{formatDate(edu.endDate)}</span>}
                    </>
                  )}
                </div>
              </div>
              {edu.field && <p className="field">{edu.field}</p>}
              {edu.description && <p className="description">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {cvData.skills?.length > 0 && (
        <div className="cv-section">
          <h3>Skills</h3>
          <div className="skills-list">
            {cvData.skills.map((skill) => (
              <span key={skill.id} className={`skill-badge level-${skill.level}`}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
