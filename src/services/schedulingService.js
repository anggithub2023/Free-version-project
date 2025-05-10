// src/services/schedulingService.js

import supabase from '../lib/supabaseClient';

const getTeamId = () => localStorage.getItem('team_id');

// ✅ Coach: Get all events with RSVP data (corrected for Supabase FK schema)
export async function getAllEventsWithRSVPs() {
    const teamId = getTeamId();
    if (!teamId) throw new Error('Missing team ID');

    const { data, error } = await supabase
        .from('events')
        .select('*, rsvps(*, users_auth(full_name))') // 👈 Fix: use users_auth not users
        .eq('team_id', teamId)
        .order('event_date', { ascending: true });

    if (error) {
        console.error('❌ Error fetching events with RSVPs:', error);
        throw error;
    }

    return data;
}

// ✅ Player: Get upcoming events
export async function getUpcomingEvents() {
    const teamId = getTeamId();
    if (!teamId) throw new Error('Missing team ID');

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('team_id', teamId)
        .gte('event_date', today)
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

// ✅ Submit RSVP
export async function submitRSVP({ eventId, userId, status }) {
    if (!eventId || !status || !userId) throw new Error('Missing RSVP data');

    const teamId = getTeamId();
    if (!teamId) throw new Error('Missing team ID');

    const payload = {
        event_id: eventId,
        user_id: userId,
        response: status,
        team_id: teamId
    };

    const { error } = await supabase
        .from('rsvps')
        .upsert(payload, { onConflict: ['event_id', 'user_id'] });

    if (error) throw error;
}

// ✅ Get single event
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

// ✅ Create event with debug logs
export async function createEvent(payload) {
    const teamId = getTeamId();
    const { data: authUser, error: userError } = await supabase.auth.getUser();

    console.log('👤 Auth user:', authUser?.user?.id);
    console.log('🏷️ Team ID:', teamId);
    console.log('📦 Payload:', payload);

    if (userError) {
        console.error('🔒 Failed to fetch auth user:', userError);
        throw userError;
    }

    if (!authUser?.user?.id || !teamId) {
        throw new Error('Missing user or team ID');
    }

    const { data, error } = await supabase
        .from('events')
        .insert({
            ...payload,
            team_id: teamId,
            created_by: authUser.user.id
        })
        .select()
        .single();

    if (error) {
        console.error('❌ Insert failed:', error);
        throw error;
    }

    return data;
}