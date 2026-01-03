// AI Helper for CV improvement suggestions
// Using a free AI service or local suggestions

export const generateCVSuggestions = async (cvData) => {
  // Simulate AI analysis with practical suggestions
  const suggestions = []

  // Analyze personal info
  if (cvData.personalInfo) {
    if (!cvData.personalInfo.summary || cvData.personalInfo.summary.length < 50) {
      suggestions.push({
        section: 'Personal Info',
        type: 'warning',
        message: 'Your professional summary is too short. Aim for 100-150 words highlighting your key strengths and career goals.'
      })
    }
    if (!cvData.personalInfo.phone || !cvData.personalInfo.email) {
      suggestions.push({
        section: 'Personal Info',
        type: 'error',
        message: 'Missing contact information. Add both phone and email for better visibility.'
      })
    }
  }

  // Analyze experience
  if (cvData.experience && cvData.experience.length > 0) {
    cvData.experience.forEach((exp, idx) => {
      if (!exp.description || exp.description.length < 100) {
        suggestions.push({
          section: 'Experience',
          type: 'warning',
          message: `Position ${idx + 1} (${exp.jobTitle}): Add more details about achievements and responsibilities. Use bullet points with quantifiable results.`
        })
      }
      if (exp.description && !exp.description.match(/\d+/)) {
        suggestions.push({
          section: 'Experience',
          type: 'tip',
          message: `Position ${idx + 1}: Add numbers/metrics (e.g., "increased sales by 30%", "managed team of 5") to make impact more tangible.`
        })
      }
    })
  } else {
    suggestions.push({
      section: 'Experience',
      type: 'error',
      message: 'No work experience added. This is crucial for most positions.'
    })
  }

  // Analyze education
  if (!cvData.education || cvData.education.length === 0) {
    suggestions.push({
      section: 'Education',
      type: 'warning',
      message: 'Add your educational background to strengthen your CV.'
    })
  }

  // Analyze skills
  if (!cvData.skills || cvData.skills.length < 5) {
    suggestions.push({
      section: 'Skills',
      type: 'warning',
      message: 'Add at least 5-10 relevant skills. Include both technical and soft skills.'
    })
  }

  // Analyze projects
  if (cvData.projects && cvData.projects.length > 0) {
    suggestions.push({
      section: 'Projects',
      type: 'success',
      message: 'Great! Including projects shows initiative and practical experience.'
    })
  } else {
    suggestions.push({
      section: 'Projects',
      type: 'tip',
      message: 'Consider adding personal or professional projects to showcase your skills in action.'
    })
  }

  // General tips
  suggestions.push({
    section: 'General',
    type: 'tip',
    message: '💡 Use action verbs: "developed", "managed", "implemented", "increased", "led"'
  })

  suggestions.push({
    section: 'General',
    type: 'tip',
    message: '💡 Keep it concise: Aim for 1-2 pages. Recruiters spend 6-7 seconds on first review.'
  })

  return suggestions
}

export const improveSectionContent = (section, content) => {
  const improvements = {
    summary: [
      'Start with your role/title',
      'Highlight 2-3 key achievements',
      'Mention years of experience',
      'Include your value proposition'
    ],
    experience: [
      'Use STAR method (Situation, Task, Action, Result)',
      'Start each bullet with action verbs',
      'Include quantifiable metrics',
      'Focus on achievements, not just duties'
    ],
    skills: [
      'Group by category (Technical, Soft, Languages)',
      'List proficiency levels',
      'Include relevant certifications',
      'Align with job requirements'
    ]
  }

  return improvements[section] || []
}

export const generateAIEnhancedText = async (text, type) => {
  // Simulate AI enhancement with practical rewording
  const enhancements = {
    'experience-description': [
      'Led cross-functional team of 5 members to deliver project 2 weeks ahead of schedule',
      'Implemented automated testing framework, reducing bugs by 40%',
      'Managed budget of $500K while maintaining 95% cost efficiency',
      'Developed new feature that increased user engagement by 35%'
    ],
    'summary': [
      'Results-driven professional with 5+ years of experience in software development. Proven track record of delivering high-quality solutions and leading successful projects. Passionate about innovation and continuous improvement.',
      'Experienced team leader with expertise in project management and agile methodologies. Successfully delivered 20+ projects on time and under budget. Strong communicator with ability to bridge technical and business needs.'
    ]
  }

  const examples = enhancements[type] || []
  return examples[Math.floor(Math.random() * examples.length)] || text
}
