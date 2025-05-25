// Supabase client initialization.
// IMPORTANT: If this file is automatically regenerated (e.g., by Supabase CLI),
// ensure the environment variable usage (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
// is preserved or reapplied. Type definitions are typically in './types.ts'.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  throw new Error("VITE_SUPABASE_URL is not defined. Please check your .env file.");
}
if (!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error("VITE_SUPABASE_ANON_KEY is not defined. Please check your .env file.");
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);