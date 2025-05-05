// src/components/Scheduling/eventService.js
import { supabase } from '../../supabaseClient';

export async function createEvent(eventData) {
    const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
}

export async function submitRSVP(eventId, userId, response) {
    const { data, error } = await supabase
        .from('rsvps')
        .upsert({ event_id: eventId, user_id: userId, response }, { onConflict: ['event_id', 'user_id'] });

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchRSVPs(eventId) {
    const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .eq('event_id', eventId);

    if (error) throw new Error(error.message);
    return data;
}
