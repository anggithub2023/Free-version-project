import { createClient } from '@supabase/supabase-js';

const SCHEDULING_URL = process.env.REACT_APP_SCHEDULING_URL;
const SCHEDULING_ANON_KEY = process.env.REACT_APP_SCHEDULING_ANON_KEY;

export const schedulingSupabase = createClient(SCHEDULING_URL, SCHEDULING_ANON_KEY);