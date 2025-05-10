// services/schedulingService.js

import supabase from '../lib/supabaseClient';

// 🧠 Utility
const getTeamId = () => localStorage.getItem('team_id');

// ✅ Create new event (with logging for RLS debugging)
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