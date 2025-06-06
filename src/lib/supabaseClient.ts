
// Supabase client initialization.
// IMPORTANT: If this file is automatically regenerated (e.g., by Supabase CLI),
// ensure the environment variable usage (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
// is preserved or reapplied. Type definitions are typically in './types.ts'.
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
const isSupabaseConfigured = SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY;

if (!isSupabaseConfigured) {
  console.warn("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables or connect to Supabase through Lovable's integration.");
}

// Create a mock client if Supabase is not configured to prevent runtime errors
const createMockClient = () => ({
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    eq: function() { return this; },
    order: function() { return this; }
  }),
  auth: {
    signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signIn: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  }
});

export const supabase = isSupabaseConfigured 
  ? createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  : createMockClient() as any;
