// src/services/schedulingService.js
import supabase from '../lib/supabaseClient';

// 🔐 Get current user + team_id
async function getCurrentUserWithTeam() {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("User not authenticated");

    const { data: profile, error: profileError } = await supabase
        .from('users_auth')
        .select('team_id')
        .eq('id', user.id)
        .single();

    if (profileError || !profile?.team_id) {
        throw new Error("Missing or invalid team_id.");
    }

    return { user, team_id: profile.team_id };
}

// 🗓️ Create new event (coach only)
export async function createEvent(eventData) {
    const { user, team_id } = await getCurrentUserWithTeam();
    const payload = {
        ...eventData,
        created_by: user.id,
        team_id,
    };

    const { data, error } = await supabase.from('events').insert([payload]);
    if (error) throw new Error(`Failed to create event: ${error.message}`);
    return data;
}

// 📥 Fetch all events for current team
export async function fetchEvents() {
    const { team_id } = await getCurrentUserWithTeam();
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('team_id', team_id)
        .order('event_date', { ascending: true });

    if (error) throw new Error(`Failed to fetch events: ${error.message}`);
    return data;
}

// ✋ RSVP to event (auth or anon)
export async function rsvpToEvent({ eventId, userId, anonymousId, anonymousName, status }) {
    if (!eventId || !status) throw new Error("Missing event or response.");

    if (userId) {
        const { team_id } = await getCurrentUserWithTeam();
        const { data, error } = await supabase
            .from('rsvps')
            .upsert(
                { event_id: eventId, user_id: userId, team_id, response: status },
                { onConflict: ['event_id', 'user_id'] }
            );
        if (error) throw new Error(`Failed to RSVP: ${error.message}`);
        return data;
    } else {
        if (!anonymousId || !anonymousName) {
            throw new Error("Anonymous RSVP requires ID and name.");
        }

        const { data, error } = await supabase
            .from('rsvps')
            .upsert(
                { event_id: eventId, anonymous_id: anonymousId, anonymous_name: anonymousName, response: status },
                { onConflict: ['event_id', 'anonymous_id'] }
            );
        if (error) throw new Error(`Failed to RSVP anonymously: ${error.message}`);
        return data;
    }
}

// 📊 Get RSVPs for a specific event
export async function fetchRsvpsByEvent(eventId) {
    if (!eventId) throw new Error("Missing eventId");
    const { data, error } = await supabase
        .from('rsvps')
        .select('response, user_id, anonymous_id, anonymous_name, users(full_name)')
        .eq('event_id', eventId);

    if (error) throw new Error(`Failed to fetch RSVPs: ${error.message}`);
    return data;
}

// 🔮 Get upcoming events (auth-aware)
export async function getUpcomingEvents() {
    const now = new Date().toISOString();

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        const { team_id } = await getCurrentUserWithTeam();
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('team_id', team_id)
            .gte('event_date', now)
            .order('event_date', { ascending: true });

        if (error) throw new Error(`Failed to fetch upcoming events: ${error.message}`);
        return data;
    } else {
        // anon view fallback
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .gte('event_date', now)
            .order('event_date', { ascending: true });

        if (error) throw new Error(`Failed to fetch public events: ${error.message}`);
        return data;
    }
}

// 📊 Coach dashboard: get all events + RSVPs
export async function getAllEventsWithRSVPs() {
    const { team_id } = await getCurrentUserWithTeam();

    const { data, error } = await supabase
        .from('events')
        .select('*, rsvps(*)')
        .eq('team_id', team_id)
        .order('event_date', { ascending: true });

    if (error) throw new Error(`Failed to fetch event RSVPs: ${error.message}`);
    return data;
}

// 🔁 Alias
export const submitRSVP = rsvpToEvent;