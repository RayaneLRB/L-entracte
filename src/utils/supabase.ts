import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cjszbbxqxbiylxburrnn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_aBynmfXirVxUkDWG8A5YJA_-3utdEob';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
