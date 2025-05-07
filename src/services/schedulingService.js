// src/services/schedulingService.js
import { schedulingSupabase as supabase } from '../lib/schedulingClient';

// ✅ Authenticated: Get user + team
async function getCurrentUserWithTeam() {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("User not authenticated");

    const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('team_id')
        .eq('id', user.id)
        .single();

    if (profileError || !profile?.team_id) {
        throw new Error("Failed to fetch user team_id.");
    }

    return { user, team_id: profile.team_id };
}

// ✅ Create new event (Coach only)
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

// ✅ Fetch events (coach/team-scoped)
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

// ✅ RSVP (supports both auth + anonymous)
export async function rsvpToEvent({ eventId, userId, anonymousId, anonymousName, status }) {
    if (userId) {
        // Authenticated RSVP
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
        // Anonymous RSVP
        if (!anonymousId || !anonymousName) throw new Error("Anonymous ID and name required");

        const { data, error } = await supabase
            .from('rsvps')
            .upsert(
                { event_id: eventId, anonymous_id: anonymousId, anonymous_name: anonymousName, response: status },
                { onConflict: ['event_id', 'anonymous_id'] }
            );
        if (error) throw new Error(`Failed to RSVP: ${error.message}`);
        return data;
    }
}

// ✅ Event RSVP list (for chart)
export async function fetchRsvpsByEvent(eventId) {
    const { data, error } = await supabase
        .from('rsvps')
        .select('response, user_id, anonymous_id, anonymous_name, users(full_name)')
        .eq('event_id', eventId);

    if (error) throw new Error(`Failed to fetch RSVPs: ${error.message}`);
    return data;
}

// ✅ Upcoming events (team filtered)
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
        // Anonymous users see all public events (or all until filtering is added)
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .gte('event_date', now)
            .order('event_date', { ascending: true });

        if (error) throw new Error(`Failed to fetch events: ${error.message}`);
        return data;
    }
}

// ✅ Coach dashboard view (all events with RSVPs)
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

// Alias
export const submitRSVP = rsvpToEvent;
