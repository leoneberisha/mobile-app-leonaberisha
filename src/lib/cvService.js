import supabase from '../lib/supabaseClient'

// Save CV to user's profile in Supabase
export const saveCVToSupabase = async (userId, cvData, layout) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          user_id: userId,
          personal_info: cvData.personalInfo,
          education: cvData.education,
          experience: cvData.experience,
          skills: cvData.skills,
          layout: layout,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'user_id' }
      )
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (err) {
    console.error('Error saving CV:', err)
    return { data: null, error: err.message }
  }
}

// Load CV from user's profile in Supabase
export const loadCVFromSupabase = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('personal_info, education, experience, skills, layout')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows found

    if (!data) {
      return { data: null, error: null } // No saved CV yet
    }

    return {
      data: {
        personalInfo: data.personal_info,
        education: data.education,
        experience: data.experience,
        skills: data.skills,
        layout: data.layout || 'modern'
      },
      error: null
    }
  } catch (err) {
    console.error('Error loading CV:', err)
    return { data: null, error: err.message }
  }
}
