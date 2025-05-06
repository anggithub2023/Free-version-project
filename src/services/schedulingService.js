// src/services/schedulingService.js
import { supabase } from '../supabaseClient';

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
 * Fetch RSVPs for a specific event with player name
 * @param {string} eventId
 */
export async function fetchRsvpsByEvent(eventId) {
    const { data, error } = await supabase
        .from('rsvps')
        .select('status, user_id, profiles(name)')
        .eq('event_id', eventId);
    if (error) throw new Error(`Failed to fetch RSVPs: ${error.message}`);
    return data;
}