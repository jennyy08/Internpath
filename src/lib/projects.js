import { supabase } from './supabase'

export async function getProjectsByIds(ids) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .in('id', ids)

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data
}

export async function getAllProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data
}