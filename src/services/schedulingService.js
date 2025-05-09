// src/services/schedulingService.js
import supabase from '../lib/supabaseClient';

// ✅ Create a new event
export async function createEvent(eventData) {
    const teamId = localStorage.getItem('team_id');
    if (!teamId) throw new Error('Missing team ID');

    const newEvent = { ...eventData, team_id: teamId };

    const { data, error } = await supabase.from('events').insert(newEvent).select().single();

    if (error) throw error;
    return data;
}

// ✅ Get all events for a team
export async function getUpcomingEvents() {
    const teamId = localStorage.getItem('team_id');
    if (!teamId) throw new Error('Missing team ID');

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('team_id', teamId)
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

// ✅ Alias to prevent import error
export const fetchEvents = getUpcomingEvents;

// ✅ Fetch all events with RSVPs
export async function getAllEventsWithRSVPs() {
    const teamId = localStorage.getItem('team_id');
    if (!teamId) throw new Error('Missing team ID');

    const { data, error } = await supabase
        .from('events')
        .select('*, rsvps(*)')
        .eq('team_id', teamId)
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

// ✅ Submit RSVP response
export async function submitRSVP(eventId, response) {
    if (!eventId || !response) throw new Error('Missing event or response.');

    const { data: userInfo, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const userId = userInfo.user?.id;
    if (!userId) throw new Error('User not authenticated.');

    const { error: upsertError } = await supabase
        .from('rsvps')
        .upsert({ event_id: eventId, user_id: userId, response }, { onConflict: ['event_id', 'user_id'] });

    if (upsertError) throw upsertError;
}

// ✅ Get a single event by ID
export async function getEventById(eventId) {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

    if (error) throw error;
    return data;
}

// ✅ Update an event
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