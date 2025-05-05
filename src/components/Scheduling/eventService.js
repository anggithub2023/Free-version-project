// src/components/Scheduling/events/eventService.js
import { supabase } from '../../../supabaseClient';

export async function createEvent(eventData) {
    const { data, error } = await supabase.from('events').insert([eventData]);
    if (error) throw error;
    return data;
}

export async function fetchEvents() {
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
    if (error) throw error;
    return data;
}

export async function rsvpToEvent({ eventId, userId, status }) {
    const { data, error } = await supabase
        .from('rsvps')
        .upsert({ event_id: eventId, user_id: userId, status }, { onConflict: ['event_id', 'user_id'] });
    if (error) throw error;
    return data;
}

export async function fetchRsvpsByEvent(eventId) {
    const { data, error } = await supabase
        .from('rsvps')
        .select('*, profiles(name)')
        .eq('event_id', eventId);
    if (error) throw error;
    return data;
}
