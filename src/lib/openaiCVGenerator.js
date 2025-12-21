// Google Gemini CV Generator using real AI API
export async function generateCVWithAI({ name, email, phone, location, personalSummary, education, skills }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  
  if (!apiKey) {
    throw new Error('Google Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.')
  }

  const educationText = education
    .filter((edu) => edu.school || edu.degree)
    .map((edu) => `${edu.degree || 'Degree'} in ${edu.field || 'Field'} from ${edu.school || 'Institution'} (${edu.startDate || 'Start'} - ${edu.endDate || 'End'})`)
    .join('\n')

  const skillsText = skills
    .filter((s) => s.name)
    .map((s) => `${s.name} (${s.level || 'intermediate'})`)
    .join(', ')

  const prompt = `You are a professional CV writer. Generate a competitive, job-market-ready CV for the following person:

**Personal Information:**
- Name: ${name || 'N/A'}
- Email: ${email || 'N/A'}
- Phone: ${phone || 'N/A'}
- Location: ${location || 'N/A'}
- Personal Summary: ${personalSummary || 'N/A'}

**Education:**
${educationText || 'N/A'}

**Skills:**
${skillsText || 'N/A'}

Please generate a professional CV with:
1. A compelling professional profile/summary (2-3 sentences)
2. Clear sections for education and skills
3. Professional, confident, and formal language
4. Action-oriented descriptions
5. Job-market ready content

Format the output with clear section headers and bullet points where appropriate.`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to generate CV with Gemini')
    }

    const data = await response.json()
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text
    } else {
      throw new Error('Unexpected response format from Gemini API')
    }
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw error
  }
}
