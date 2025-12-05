export function CVPreview({ cvData, layout = 'modern' }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const [year, month] = dateStr.split('-')
    const date = new Date(year, month - 1)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  // Modern Layout - Clean with accent colors
  const renderModern = () => (
    <div className="cv-preview cv-modern">
      <div className="cv-header cv-header-modern">
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
        <div className="cv-section cv-summary-modern">
          <h3>Professional Summary</h3>
          <p>{cvData.personalInfo.summary}</p>
        </div>
      )}

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

  // Classic Layout - Traditional resume style
  const renderClassic = () => (
    <div className="cv-preview cv-classic">
      <div className="cv-header cv-header-classic">
        <h1>{cvData.personalInfo?.name || 'Your Name'}</h1>
        <div className="contact-info contact-info-classic">
          {cvData.personalInfo?.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo?.phone && <span> | {cvData.personalInfo.phone}</span>}
          {cvData.personalInfo?.location && <span> | {cvData.personalInfo.location}</span>}
        </div>
      </div>

      {cvData.personalInfo?.summary && (
        <div className="cv-section">
          <h3 className="section-title-classic">PROFESSIONAL SUMMARY</h3>
          <p>{cvData.personalInfo.summary}</p>
        </div>
      )}

      {cvData.experience?.length > 0 && (
        <div className="cv-section">
          <h3 className="section-title-classic">WORK EXPERIENCE</h3>
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="cv-entry">
              <h4 className="job-title-classic">{exp.jobTitle} — {exp.company}</h4>
              {exp.location && <p className="location">{exp.location}</p>}
              {exp.startDate && (
                <p className="dates-classic">
                  {formatDate(exp.startDate)} – {exp.currentlyWorking ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : 'Present')}
                </p>
              )}
              {exp.description && <p className="description">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {cvData.education?.length > 0 && (
        <div className="cv-section">
          <h3 className="section-title-classic">EDUCATION</h3>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="cv-entry">
              <h4 className="degree-classic">{edu.degree} in {edu.field}</h4>
              <p className="school">{edu.school}</p>
              {edu.startDate && (
                <p className="dates-classic">
                  {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                </p>
              )}
              {edu.description && <p className="description">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {cvData.skills?.length > 0 && (
        <div className="cv-section">
          <h3 className="section-title-classic">SKILLS</h3>
          <div className="skills-list skills-list-classic">
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

  // Minimal Layout - Clean and spacious
  const renderMinimal = () => (
    <div className="cv-preview cv-minimal">
      <div className="cv-header cv-header-minimal">
        <h1>{cvData.personalInfo?.name || 'Your Name'}</h1>
        <div className="contact-info contact-info-minimal">
          {cvData.personalInfo?.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo?.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo?.location && <span>{cvData.personalInfo.location}</span>}
        </div>
      </div>

      {cvData.personalInfo?.summary && (
        <div className="cv-section cv-section-minimal">
          <p className="summary-minimal">{cvData.personalInfo.summary}</p>
        </div>
      )}

      {cvData.experience?.length > 0 && (
        <div className="cv-section cv-section-minimal">
          <h3>Experience</h3>
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="cv-entry cv-entry-minimal">
              <h4>{exp.jobTitle}</h4>
              <p className="company-minimal">{exp.company} {exp.location && `· ${exp.location}`}</p>
              {exp.startDate && (
                <p className="dates-minimal">
                  {formatDate(exp.startDate)} – {exp.currentlyWorking ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : 'Present')}
                </p>
              )}
              {exp.description && <p className="description">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {cvData.education?.length > 0 && (
        <div className="cv-section cv-section-minimal">
          <h3>Education</h3>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="cv-entry cv-entry-minimal">
              <h4>{edu.school}</h4>
              <p className="degree-minimal">{edu.degree} in {edu.field}</p>
              {edu.startDate && (
                <p className="dates-minimal">
                  {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {cvData.skills?.length > 0 && (
        <div className="cv-section cv-section-minimal">
          <h3>Skills</h3>
          <div className="skills-list skills-list-minimal">
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

  // Two-Column Layout - Sidebar design
  const renderTwoColumn = () => (
    <div className="cv-preview cv-two-column">
      <div className="cv-sidebar">
        <div className="sidebar-section">
          <h1>{cvData.personalInfo?.name || 'Your Name'}</h1>
        </div>
        
        <div className="sidebar-section">
          <h3>Contact</h3>
          {cvData.personalInfo?.email && <p>{cvData.personalInfo.email}</p>}
          {cvData.personalInfo?.phone && <p>{cvData.personalInfo.phone}</p>}
          {cvData.personalInfo?.location && <p>{cvData.personalInfo.location}</p>}
        </div>

        {cvData.skills?.length > 0 && (
          <div className="sidebar-section">
            <h3>Skills</h3>
            <div className="skills-list skills-list-sidebar">
              {cvData.skills.map((skill) => (
                <span key={skill.id} className={`skill-badge level-${skill.level}`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="cv-main">
        {cvData.personalInfo?.summary && (
          <div className="cv-section">
            <h3>About</h3>
            <p>{cvData.personalInfo.summary}</p>
          </div>
        )}

        {cvData.experience?.length > 0 && (
          <div className="cv-section">
            <h3>Work Experience</h3>
            {cvData.experience.map((exp) => (
              <div key={exp.id} className="cv-entry">
                <h4>{exp.jobTitle}</h4>
                <p className="company">{exp.company}</p>
                {exp.location && <p className="location">{exp.location}</p>}
                {exp.startDate && (
                  <p className="dates">
                    {formatDate(exp.startDate)} – {exp.currentlyWorking ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : 'Present')}
                  </p>
                )}
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
                <h4>{edu.degree}</h4>
                <p className="school">{edu.school}</p>
                {edu.field && <p className="field">{edu.field}</p>}
                {edu.startDate && (
                  <p className="dates">
                    {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // Render based on selected layout
  switch (layout) {
    case 'classic':
      return renderClassic()
    case 'minimal':
      return renderMinimal()
    case 'twoColumn':
      return renderTwoColumn()
    case 'modern':
    default:
      return renderModern()
  }
}
