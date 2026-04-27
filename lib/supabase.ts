import { createClient } from '@supabase/supabase-js';
import { env } from './env';
export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseService, { auth: { persistSession: false } });
export const supabasePublic = createClient(env.supabaseUrl, env.supabaseAnon);
