// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ✅ Replace with your actual project values from https://app.supabase.com/project/_/settings/api
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-public-api-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;