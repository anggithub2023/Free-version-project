import supabase from '../lib/supabaseClient';

/**
 * ✅ Get events with RSVPs – used by coaches
 */
export async function getAllEventsWithRSVPs() {
    const teamId = localStorage.getItem('team_id');

    const { data, error } = await supabase
        .from('events')
        .select('*, rsvps(*, users(id, full_name))')
        .eq('team_id', teamId)
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

/**
 * ✅ Get upcoming events – used by players
 */
export async function getUpcomingEvents() {
    const teamId = localStorage.getItem('team_id');

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('team_id', teamId)
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

/**
 * ✅ Submit RSVP for logged-in or anonymous user
 */
export async function submitRSVP({ eventId, userId, anonymousId, anonymousName, status }) {
    if (!eventId || !status) throw new Error('Missing event or response.');

    const payload = {
        event_id: eventId,
        response: status,
        ...(userId ? { user_id: userId } : {}),
        ...(anonymousId ? { anonymous_id: anonymousId } : {}),
        ...(anonymousName ? { anonymous_name: anonymousName } : {})
    };

    const { error } = await supabase
        .from('rsvps')
        .upsert(payload, {
            onConflict: ['event_id', userId ? 'user_id' : 'anonymous_id']
        });

    if (error) throw error;
}

/**
 * ✅ Get single event by ID (used in detail view)
 */
export async function getEventById(eventId) {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

    if (error) throw error;
    return data;
}

/**
 * ✅ Update event details
 */
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

/**
 * ✅ Create a new event (coach only)
 */
export async function createEvent(event) {
    const teamId = localStorage.getItem('team_id');

    const payload = {
        ...event,
        team_id: teamId
    };

    const { data, error } = await supabase
        .from('events')
        .insert(payload)
        .select()
        .single();

    if (error) throw error;
    return data;
}