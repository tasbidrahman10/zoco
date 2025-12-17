import { createClient } from '@supabase/supabase-js';

// Helper to safely access environment variables without crashing
const getEnv = (key: string) => {
  // Check for Vite/Modern env
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env[key];
  }
  // Check for Standard Node/Webpack env
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

// Log a friendly warning if keys are missing instead of crashing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables are missing! The app will run in "Offline Mode" (Database features will fail). Check your .env file.');
}

// Create client with fallback values to prevent initialization crash
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);