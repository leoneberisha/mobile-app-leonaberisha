// Shared CV Data Template - used by all layout designs
export const CVDataTemplate = {
  personalInfo: {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    summary: 'Marketing professional with 5+ years of experience.'
  },
  education: [
    {
      id: 1,
      school: 'New York University',
      degree: 'MBA',
      field: 'Marketing',
      startDate: '2015-09',
      endDate: '2017-05',
      description: ''
    }
  ],
  experience: [
    {
      id: 2,
      jobTitle: 'Marketing Manager',
      company: 'Creative Agency',
      location: 'New York, NY',
      startDate: '2020-03',
      endDate: '',
      currentlyWorking: true,
      description: '• Led digital campaigns\n• Managed marketing team'
    }
  ],
  skills: [
    { id: 4, name: 'Social Media Marketing', level: 'expert' },
    { id: 5, name: 'Content Strategy', level: 'advanced' }
  ],
  languages: [
    { id: 6, name: 'English', level: 'native' },
    { id: 7, name: 'Spanish', level: 'intermediate' }
  ],
  interests: [
    { id: 8, name: 'Photography' },
    { id: 9, name: 'Travel' }
  ],
  projects: [
    {
      id: 10,
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with payment integration and inventory management.',
      technologies: 'React, Node.js, MongoDB, Stripe'
    }
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
    name: 'Two Column',
    description: 'Sidebar layout with skills on side'
  },
  creative: {
    name: 'Creative',
    description: 'Bold design with colorful accents'
  },
  executive: {
    name: 'Executive',
    description: 'Premium layout for senior roles'
  },
  academic: {
    name: 'Academic',
    description: 'Research-focused with detailed formatting'
  },
  compact: {
    name: 'Compact',
    description: 'Space-efficient single page design'
  }
}