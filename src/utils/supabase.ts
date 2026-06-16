import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cjszbbxqxbiylxburrnn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqc3piYnhxeGJpeWx4YnVycm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNzU5NDMsImV4cCI6MjA5Njk1MTk0M30.rqejtI5T-_ky_cg1hZHe9zhiAapVC8YLZNv2uvPNX04';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
