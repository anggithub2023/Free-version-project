// src/services/schedulingService.js
import { schedulingSupabase as supabase } from '../lib/schedulingClient';

/**
 * Create a new event
 * @param {Object} eventData - Fields: title, description, date, location, created_by
 */
export async function createEvent(eventData) {
    const { data, error } = await supabase.from('events').insert([eventData]);
    if (error) throw new Error(`Failed to create event: ${error.message}`);
    return data;
}

/**
 * Fetch all events, ordered by date
 */
export async function fetchEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
    if (error) throw new Error(`Failed to fetch events: ${error.message}`);
    return data;
}

/**
 * RSVP to an event
 * @param {string} eventId
 * @param {string} userId
 * @param {string} status - 'yes', 'no', 'maybe'
 */
export async function rsvpToEvent(eventId, userId, status) {
    const { data, error } = await supabase
        .from('rsvps')
        .upsert(
            { event_id: eventId, user_id: userId, status },
            { onConflict: ['event_id', 'user_id'] }
        );
    if (error) throw new Error(`Failed to RSVP: ${error.message}`);
    return data;
}

/**
 * Fetch all upcoming events from today forward
 */
export async function getUpcomingEvents() {
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', now)
        .order('date', { ascending: true });
    if (error) throw new Error(`Failed to fetch upcoming events: ${error.message}`);
    return data;
}

/**
 * Fetch all events with their RSVP records (for coaches)
 */
export async function getAllEventsWithRSVPs() {
    const { data, error } = await supabase
        .from('events')
        .select('*, rsvps(*)');
    if (error) throw new Error(`Failed to fetch event RSVPs: ${error.message}`);
    return data;
}