import { supabase } from './supabase';
import type { Database } from './database.types';

export type { Database };
export { supabase };

export const getTypedSupabaseClient = () => supabase;
