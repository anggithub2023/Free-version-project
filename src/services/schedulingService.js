import supabase from '../lib/supabaseClient';

// ✅ Fetch all events with RSVPs for a team
export async function getAllEventsWithRSVPs() {
    const { data, error } = await supabase
        .from('events')
        .select('*, rsvps(*)')
        .eq('team_id', localStorage.getItem('team_id'))
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

// ✅ Submit RSVP response for current user
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