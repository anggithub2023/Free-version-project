// src/services/schedulingService.js
import { schedulingSupabase as supabase } from '../lib/schedulingClient';
import { v4 as uuidv4 } from 'uuid';

// Helper to get current user or generate anonymous ID
async function getUserContext() {
    const session = await supabase.auth.getSession();
    const user = session?.data?.session?.user;

    if (user) {
        return { userId: user.id, anonymousId: null };
    }

    let anonymousId = localStorage.getItem('anonymous_id');
    if (!anonymousId) {
        anonymousId = uuidv4();
        localStorage.setItem('anonymous_id', anonymousId);
    }

    return { userId: null, anonymousId };
}

// 📌 Create a new event
export async function createEvent(eventData) {
    const { data, error } = await supabase.from('events').insert([eventData]);
    if (error) throw new Error(`❌ Failed to create event: ${error.message}`);
    return data;
}

// 📌 Fetch all events (ascending by date)
export async function fetchEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });
    if (error) throw new Error(`❌ Failed to fetch events: ${error.message}`);
    return data;
}

// 📌 RSVP to an event (supporting both user and anonymous)
export async function rsvpToEvent(eventId, status) {
    const { userId, anonymousId } = await getUserContext();

    const payload = {
        event_id: eventId,
        status,
        user_id: userId,
        anonymous_id: anonymousId,
    };

    const conflictKeys = userId
        ? ['event_id', 'user_id']
        : ['event_id', 'anonymous_id'];

    const { data, error } = await supabase
        .from('rsvps')
        .upsert(payload, { onConflict: conflictKeys });

    if (error) throw new Error(`❌ Failed to RSVP: ${error.message}`);
    return data;
}

// 📌 Get RSVPs for one event (for chart or display)
export async function fetchRsvpsByEvent(eventId) {
    const { data, error } = await supabase
        .from('rsvps')
        .select('status, user_id, anonymous_id')
        .eq('event_id', eventId);
    if (error) throw new Error(`❌ Failed to fetch RSVPs: ${error.message}`);
    return data;
}

// 📌 Get only upcoming events (from today onward)
export async function getUpcomingEvents() {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', today)
        .order('event_date', { ascending: true });

    if (error) throw new Error(`❌ Failed to fetch upcoming events: ${error.message}`);
    return data;
}

// 📌 Coach: Fetch all events with RSVPs (admin view)
export async function getAllEventsWithRSVPs() {
    const { data, error } = await supabase
        .from('events')
        .select('*, rsvps(*)');

    if (error) throw new Error(`❌ Failed to fetch event RSVPs: ${error.message}`);
    return data;
}

// Alias
export const submitRSVP = rsvpToEvent;