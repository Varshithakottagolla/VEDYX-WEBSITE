import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a single supabase client for interaction with your database
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// More relaxed check for configuration
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co'))
