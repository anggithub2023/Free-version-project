// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ✅ Replace with your actual project values from https://app.supabase.com/project/_/settings/api
const SUPABASE_URL = 'https://iqdkxgfyyakwmhyyahfg.supabase.co' ;
const SUPABASE_ANON_KEY = '***REMOVED***.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZGt4Z2Z5eWFrd21oeXlhaGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODQxMzIsImV4cCI6MjA2MTc2MDEzMn0.Vyny_4dB-7q2vJpxtwQdlBUIotauNWdkzU_n-3i5ze0' ;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;