// Re-export supabase client with typed database
import { supabase } from './supabase';
import type { Database } from './database.types';

export type { Database };
export { supabase };

// Helper function to get typed supabase client
export const getTypedSupabaseClient = () => supabase;

