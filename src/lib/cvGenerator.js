// Rule-based CV Generator (No API needed - works offline)

const actionVerbs = [
  'Spearheaded', 'Orchestrated', 'Engineered', 'Architected', 'Accelerated', 'Amplified',
  'Catalyzed', 'Championed', 'Commanded', 'Crafted', 'Cultivated', 'Delivered', 'Demonstrated',
  'Deployed', 'Devised', 'Directed', 'Drove', 'Elevated', 'Enabled', 'Enhanced', 'Established',
  'Executed', 'Expanded', 'Expedited', 'Facilitated', 'Flourished', 'Forged', 'Fostered',
  'Founded', 'Generated', 'Governed', 'Grew', 'Guided', 'Implemented', 'Improved', 'Innovated',
  'Inspired', 'Instituted', 'Integrated', 'Introduced', 'Invested', 'Investigated', 'Launched',
  'Led', 'Leveraged', 'Maximized', 'Modernized', 'Navigated', 'Optimized', 'Orchestrated',
  'Pioneered', 'Produced', 'Propelled', 'Restructured', 'Revolutionized', 'Scaled', 'Secured',
  'Shaped', 'Spearheaded', 'Steered', 'Streamlined', 'Strengthened', 'Succeeded', 'Transformed'
]

const adjectives = [
  'innovative', 'strategic', 'creative', 'analytical', 'detail-oriented', 'results-driven',
  'collaborative', 'dynamic', 'proactive', 'motivated', 'dedicated', 'ambitious',
  'forward-thinking', 'visionary', 'resourceful', 'solution-focused', 'high-performing',
  'customer-centric', 'data-driven', 'agile'
]

const skillAdjectives = {
  expert: 'Expert-level proficiency in',
  advanced: 'Advanced expertise in',
  intermediate: 'Demonstrated proficiency in',
  beginner: 'Foundational knowledge of'
}

// Select items deterministically based on index
const pick = (array, index) => array[index % array.length]

// Generate more competitive professional summary
function generateProfileSummary(name, skills, education, experience) {
  const skillList = skills.filter(s => s.name).map(s => s.name)
  const primarySkill = skillList[0] || 'technology'
  const secondarySkill = skillList[1] || 'innovation'
  const thirdSkill = skillList[2] || 'excellence'
  const adj1 = pick(adjectives, skillList.length)
  const adj2 = pick(adjectives, skillList.length + 2)
  
  const verb = pick(actionVerbs, skillList.length + 1)
  
  // Calculate total years from experience data
  let totalYears = 0
  if (experience && experience.length > 0) {
    totalYears = experience.reduce((sum, exp) => {
      const years = parseInt(exp.years) || 0
      return sum + years
    }, 0)
  }
  
  // Use actual years if available, otherwise default
  const years = totalYears > 0 ? totalYears : (education.length > 0 ? '3+' : '2+')
  
  return `${adj1.charAt(0).toUpperCase() + adj1.slice(1)} and ${adj2} professional with ${years} years of proven expertise in ${primarySkill}, ${secondarySkill}, and ${thirdSkill}. ${verb} cross-functional teams to deliver high-impact solutions and drive organizational growth. Proven track record of exceeding objectives through strategic innovation and meticulous execution.`
}

// Generate more impactful statements
function generateImpactStatements(skills) {
  const skillList = skills.filter(s => s.name).map(s => s.name)
  
  const impacts = [
    (skill) => `${pick(actionVerbs, 0)} transformative initiatives using ${skill}, delivering 30%+ measurable improvements`,
    (skill) => `${pick(actionVerbs, 1)} enterprise-scale solutions with ${skill}, achieving exceptional business outcomes`,
    (skill) => `${pick(actionVerbs, 2)} strategic ${skill} implementations, optimizing workflows and increasing team productivity`,
    (skill) => `${pick(actionVerbs, 3)} innovative ${skill} frameworks, positioning organization as industry leader`,
    (skill) => `${pick(actionVerbs, 4)} ${skill} best practices across teams, ensuring quality excellence and compliance`
  ]
  
  return skillList.slice(0, 5).map((skill, idx) => {
    const impactFn = impacts[idx] || impacts[idx % impacts.length]
    return impactFn(skill)
  })
}

// Format education entries professionally with emphasis
function formatEducation(education) {
  return education
    .filter(e => e.school || e.degree)
    .map((e, idx) => {
      const parts = []
      if (e.degree) parts.push(`${e.degree}`)
      if (e.field) parts.push(`${e.field}`)
      if (e.school) parts.push(`${e.school}`)
      
      const dates = [e.startDate, e.endDate].filter(Boolean).join(' – ')
      const dateStr = dates ? ` | ${dates}` : ''
      
      return parts.join(' in ') + dateStr
    })
}

// Format skills with varied and dynamic competency descriptions
function formatSkills(skills) {
  const descriptions = [
    (skill, level) => `Extensive experience with ${skill}`,
    (skill, level) => `${skill} proficiency at ${level} level`,
    (skill, level) => `Skilled in ${skill}`,
    (skill, level) => `Deep knowledge of ${skill}`,
    (skill, level) => `Hands-on expertise in ${skill}`,
    (skill, level) => `Strong background in ${skill}`,
    (skill, level) => `Proficient with ${skill}`,
    (skill, level) => `${skill} mastery`,
    (skill, level) => `${skill} - ${level} proficiency`,
    (skill, level) => `Comprehensive experience with ${skill}`
  ]
  
  return skills
    .filter(s => s.name)
    .map((s, idx) => {
      const descFn = descriptions[idx % descriptions.length]
      return descFn(s.name, s.level)
    })
}

// Main CV generation function
export function generateCVOffline({ name, email, phone, location, personalSummary, education, skills, experience }) {
  const profileSummary = personalSummary || generateProfileSummary(name, skills, education, experience)
  const impactStatements = generateImpactStatements(skills)
  const formattedEducation = formatEducation(education)
  const formattedSkills = formatSkills(skills)
  
  const skillNames = skills.filter(s => s.name).map(s => s.name).join(' • ')

  // Plain text version
  const cvText = `${name}
${email}${phone ? ' | ' + phone : ''}${location ? ' | ' + location : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFESSIONAL PROFILE
${profileSummary}

KEY ACHIEVEMENTS
${impactStatements.map(s => '▸ ' + s).join('\n')}

CORE COMPETENCIES
${formattedSkills.map(s => '▸ ' + s).join('\n')}

TECHNICAL EXPERTISE
${skillNames || 'Comprehensive technical competencies'}

EDUCATION
${formattedEducation.length > 0 ? formattedEducation.map(e => '▪ ' + e).join('\n') : '▪ Educational credentials on file'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

  // HTML version with premium styling
  const cvHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Professional CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html {
            scroll-behavior: smooth;
        }
        body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.7;
            color: #2c3e50;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
        }
        .container {
            max-width: 950px;
            margin: 0 auto;
            background: white;
            padding: 50px 45px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            border-radius: 8px;
        }
        .header {
            border-bottom: 4px solid;
            border-image: linear-gradient(90deg, #0066cc 0%, #3399ff 100%) 1;
            padding-bottom: 25px;
            margin-bottom: 35px;
            position: relative;
        }
        .header::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #00d4ff, #0066cc);
            border-radius: 2px;
        }
        .name {
            font-size: 42px;
            font-weight: 700;
            color: #0a3a66;
            margin-bottom: 12px;
            letter-spacing: -0.5px;
        }
        .contact {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 8px;
        }
        .contact-item {
            color: #666;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .contact-item::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            background: #0066cc;
            border-radius: 50%;
        }
        .contact-item:first-child::before {
            content: '✉';
            width: auto;
            height: auto;
            background: none;
            border-radius: 0;
            font-size: 12px;
        }
        .section {
            margin-bottom: 35px;
        }
        .section:last-child {
            margin-bottom: 0;
        }
        .section-title {
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            background: linear-gradient(90deg, #0066cc 0%, #3399ff 100%);
            padding: 10px 15px;
            margin-bottom: 18px;
            text-transform: uppercase;
            letter-spacing: 2px;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 102, 204, 0.2);
        }
        .profile-text {
            color: #2c3e50;
            line-height: 1.9;
            font-size: 15px;
            text-align: justify;
        }
        .achievement, .competency, .edu-item, .skill-tag {
            margin-bottom: 14px;
            color: #2c3e50;
            padding-left: 24px;
            position: relative;
            font-size: 14px;
            line-height: 1.7;
        }
        .achievement::before, .competency::before, .edu-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 6px;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #0066cc, #3399ff);
            border-radius: 50%;
        }
        .edu-item::before {
            width: 6px;
            height: 6px;
            background: #0066cc;
        }
        .skill-tag {
            display: inline-block;
            margin-right: 12px;
            margin-bottom: 10px;
            padding: 8px 14px;
            background: #f0f5ff;
            border-left: 3px solid #0066cc;
            border-radius: 3px;
            padding-left: 12px;
        }
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 45px;
            padding-top: 20px;
            border-top: 2px solid #e8eef5;
            color: #999;
            font-size: 12px;
            letter-spacing: 1px;
        }
        @media (max-width: 600px) {
            .container {
                padding: 30px 20px;
            }
            .name {
                font-size: 28px;
            }
            .contact {
                flex-direction: column;
                gap: 10px;
            }
            .section-title {
                font-size: 12px;
                padding: 8px 12px;
            }
        }
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
                border-radius: 0;
                padding: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="name">${name || 'Professional Name'}</div>
            <div class="contact">
                ${email ? `<div class="contact-item">${email}</div>` : ''}
                ${phone ? `<div class="contact-item">📱 ${phone}</div>` : ''}
                ${location ? `<div class="contact-item">📍 ${location}</div>` : ''}
            </div>
        </div>

        <div class="section">
            <div class="section-title">Professional Overview</div>
            <div class="profile-text">${profileSummary}</div>
        </div>

        <div class="section">
            <div class="section-title">Key Achievements</div>
            ${impactStatements.map(stmt => `<div class="achievement">${stmt}</div>`).join('')}
        </div>

        <div class="section">
            <div class="section-title">Core Competencies</div>
            ${formattedSkills.map(skill => `<div class="competency">${skill}</div>`).join('')}
        </div>

        <div class="section">
            <div class="section-title">Technical Expertise</div>
            <div class="skills-container">
                ${skills.filter(s => s.name).map(skill => `<div class="skill-tag">${skill.name}</div>`).join('')}
            </div>
        </div>

        ${formattedEducation.length > 0 ? `
        <div class="section">
            <div class="section-title">Education</div>
            ${formattedEducation.map(edu => `<div class="edu-item">${edu}</div>`).join('')}
        </div>
        ` : ''}

        <div class="footer">
            ✓ Created with Professional CV Builder | ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
    </div>
</body>
</html>`

  return {
    text: cvText,
    html: cvHTML,
    sections: {
      profile: profileSummary,
      strengths: impactStatements,
      skills: formattedSkills,
      education: formattedEducation
    }
  }
}
