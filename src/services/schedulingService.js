import supabase from '../lib/supabaseClient';

// ✅ Get all events with RSVP data (coach view)
export async function getAllEventsWithRSVPs() {
    const { data, error } = await supabase
        .from('events')
        .select('*, rsvps(*)')
        .eq('team_id', localStorage.getItem('team_id'))
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

// ✅ Get upcoming events (player view)
export async function getUpcomingEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('team_id', localStorage.getItem('team_id'))
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

// ✅ Submit RSVP (supports auth + anonymous)
export async function submitRSVP({ eventId, userId, anonymousId, anonymousName, status }) {
    if (!eventId || !status) throw new Error('Missing event or response.');

    const teamId = localStorage.getItem('team_id');
    if (!teamId) throw new Error('Missing team ID');

    const payload = {
        event_id: eventId,
        response: status,
        team_id: teamId,
    };

    if (userId) {
        payload.user_id = userId;
    } else if (anonymousId) {
        payload.user_id = anonymousId;
        payload.anonymous_id = anonymousId;
        payload.anonymous_name = anonymousName || 'Anonymous';
    } else {
        throw new Error('Missing identity for RSVP');
    }

    const { error } = await supabase
        .from('rsvps')
        .upsert(payload, { onConflict: ['event_id', 'user_id'] });

    if (error) throw error;
}

// ✅ Get single event by ID
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
    const teamId = localStorage.getItem('team_id');
    const { data: authUser } = await supabase.auth.getUser();

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