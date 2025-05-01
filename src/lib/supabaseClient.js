// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ✅ Replace with your actual project values from https://app.supabase.com/project/_/settings/api
const SUPABASE_URL = 'https://zaujjqbschyhldkmwyru.supabase.co' ;
const SUPABASE_ANON_KEY = '***REMOVED***.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphdWpqcWJzY2h5aGxka213eXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwOTc3MzksImV4cCI6MjA2MTY3MzczOX0.tgfWScFigNyFrfNVDuCoW2jHBCEgGG0Y15EC4nSluMI' ;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;