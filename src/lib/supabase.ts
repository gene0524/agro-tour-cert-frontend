import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Config Check:');
console.log('URL:', supabaseUrl);
console.log('Key exists:', !!supabaseAnonKey);
console.log('Key length:', supabaseAnonKey?.length);
console.log('Key start:', supabaseAnonKey?.substring(0, 10));

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

