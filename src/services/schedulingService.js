// src/services/schedulingService.js
import { schedulingSupabase as supabase } from '../lib/schedulingClient';

// ✅ Get current authenticated user + team_id
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

// ✅ Create new event
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

// ✅ Fetch team-specific events
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

// ✅ RSVP to an event
export async function rsvpToEvent(eventId, status) {
    const { user, team_id } = await getCurrentUserWithTeam();
    const { data, error } = await supabase
        .from('rsvps')
        .upsert(
            { event_id: eventId, user_id: user.id, team_id, response: status },
            { onConflict: ['event_id', 'user_id'] }
        );

    if (error) throw new Error(`Failed to RSVP: ${error.message}`);
    return data;
}

// ✅ RSVPs for a specific event
export async function fetchRsvpsByEvent(eventId) {
    const { data, error } = await supabase
        .from('rsvps')
        .select('response, user_id, users(full_name)')
        .eq('event_id', eventId);

    if (error) throw new Error(`Failed to fetch RSVPs: ${error.message}`);
    return data;
}

// ✅ Upcoming events
export async function getUpcomingEvents() {
    const { team_id } = await getCurrentUserWithTeam();
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('team_id', team_id)
        .gte('event_date', now)
        .order('event_date', { ascending: true });

    if (error) throw new Error(`Failed to fetch upcoming events: ${error.message}`);
    return data;
}

// ✅ Coach dashboard view
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

// ✅ Alias for convenience
export const submitRSVP = rsvpToEvent;