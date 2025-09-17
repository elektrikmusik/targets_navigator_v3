// Test file to verify Supabase client configuration
import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...')

    // Test basic connection by checking if we can reach the Supabase instance
    // This uses a simple auth check that should work on any Supabase instance
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      // Check if it's a network/connection error vs auth error
      if (
        error.message.includes('Failed to fetch') ||
        error.message.includes('NetworkError')
      ) {
        console.log('Supabase connection test result: Network error')
        return {
          success: false,
          error:
            'Network error - check your Supabase URL and internet connection',
        }
      }

      // For other auth errors, the connection is working but user is not authenticated
      console.log(
        'Supabase connection successful! (Auth check - not authenticated)'
      )
      return {
        success: true,
        data: { message: 'Connected to Supabase (not authenticated)' },
        method: 'auth_check',
      }
    }

    console.log('Supabase connection successful! (Auth check)')
    return { success: true, data, method: 'auth_check' }
  } catch (error) {
    console.error('Supabase connection failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Test environment variables
export function testEnvironmentVariables() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  console.log('Environment variables check:')
  console.log('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing')

  return {
    urlSet: !!supabaseUrl,
    keySet: !!supabaseAnonKey,
    bothSet: !!supabaseUrl && !!supabaseAnonKey,
  }
}
