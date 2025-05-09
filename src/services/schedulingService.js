// src/services/schedulingService.js
import supabase from '../lib/supabaseClient';

const TEAM_ID = localStorage.getItem('team_id');

// ✅ Get all upcoming events (used across views)
export async function getUpcomingEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*, rsvps(*)')
        .eq('team_id', TEAM_ID)
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

// ✅ Fetch a single event by ID
export async function getEventById(eventId) {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

    if (error) throw error;
    return data;
}

// ✅ Update an existing event
export async function updateEvent(eventId, updates) {
    const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', eventId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// ✅ Create a new event
export async function createEvent(eventData) {
    const userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}');
    const teamId = userProfile?.team_id;

    if (!teamId) throw new Error('Missing team ID');

    const { data, error } = await supabase
        .from('events')
        .insert([{ ...eventData, team_id: teamId }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

// ✅ Submit RSVP (used by players)
export async function submitRSVP(eventId, response) {
    if (!eventId || !response) throw new Error('Missing event or response');

    const { data: userInfo, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const userId = userInfo.user?.id;
    if (!userId) throw new Error('User not authenticated');

    const { error: upsertError } = await supabase
        .from('rsvps')
        .upsert({ event_id: eventId, user_id: userId, response }, { onConflict: ['event_id', 'user_id'] });

    if (upsertError) throw upsertError;
}