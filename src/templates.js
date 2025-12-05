// Shared CV Data Template - used by all layout designs
export const CVDataTemplate = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Full-stack software engineer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud technologies.'
  },
  education: [
    {
      id: 1,
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2017-09',
      endDate: '2021-05',
      description: 'Relevant coursework: Data Structures, Algorithms, Database Systems'
    }
  ],
  experience: [
    {
      id: 2,
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: '',
      currentlyWorking: true,
      description: '• Led development of real-time data processing pipeline\n• Mentored 3 junior developers\n• Reduced API response time by 40%'
    },
    {
      id: 3,
      jobTitle: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2020-06',
      endDate: '2021-12',
      currentlyWorking: false,
      description: '• Built customer dashboard using React and Redux\n• Designed RESTful APIs using Node.js'
    }
  ],
  skills: [
    { id: 4, name: 'JavaScript', level: 'expert' },
    { id: 5, name: 'React', level: 'expert' },
    { id: 6, name: 'Node.js', level: 'advanced' },
    { id: 7, name: 'AWS', level: 'advanced' },
    { id: 8, name: 'SQL', level: 'advanced' }
  ]
}

// Template layout styles - different visual designs
export const CVLayoutTemplates = {
  modern: {
    name: 'Modern',
    description: 'Clean, contemporary design with accent color'
  },
  classic: {
    name: 'Classic',
    description: 'Traditional CV with formal structure'
  },
  minimal: {
    name: 'Minimal',
    description: 'Minimalist design with focus on content'
  },
  twoColumn: {
    name: 'Two-Column',
    description: 'Sidebar layout with contact info on left'
  }
}
