import supabase from '../lib/supabaseClient';

// 🧠 Utility
const getTeamId = () => localStorage.getItem('team_id');

// ✅ Coach: Get all events with RSVP data
export async function getAllEventsWithRSVPs() {
    const teamId = getTeamId();
    if (!teamId) throw new Error('Missing team ID');

    const { data, error } = await supabase
        .from('events')
        .select('*, rsvps(*, users(full_name))') // include user names
        .eq('team_id', teamId)
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

// ✅ Player: Get upcoming events
export async function getUpcomingEvents() {
    const teamId = getTeamId();
    if (!teamId) throw new Error('Missing team ID');

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('team_id', teamId)
        .gte('event_date', today)
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

// ✅ Submit RSVP (authenticated only)
export async function submitRSVP({ eventId, userId, status }) {
    if (!eventId || !status || !userId) throw new Error('Missing RSVP data');

    const teamId = getTeamId();
    if (!teamId) throw new Error('Missing team ID');

    const payload = {
        event_id: eventId,
        user_id: userId,
        response: status,
        team_id: teamId,
    };

    const { error } = await supabase
        .from('rsvps')
        .upsert(payload, { onConflict: ['event_id', 'user_id'] });

    if (error) throw error;
}

// ✅ Get single event
export async function getEventById(eventId) {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

    if (error) throw error;
    return data;
}

// ✅ Update event
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

// ✅ Create new event
export async function createEvent(payload) {
    const teamId = getTeamId();
    if (!teamId) throw new Error('Missing team ID');

    const { data: authUser } = await supabase.auth.getUser();
    if (!authUser?.user?.id) throw new Error('Missing user context');

    const { data, error } = await supabase
        .from('events')
        .insert({
            ...payload,
            team_id: teamId,
            created_by: authUser.user.id,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}