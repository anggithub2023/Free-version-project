// src/services/teamService.js
import supabase from '../lib/supabaseClient';

export async function createTeam(name) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error('🛑 Auth error or no user:', authError);
        throw new Error('Not authenticated');
    }

    console.log('🧪 Authenticated user:', user);

    const joinCode = crypto.randomUUID().slice(0, 6).toUpperCase();

    // 1. Create team
    const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert([{ name, join_code: joinCode }])
        .select()
        .single();

    if (teamError) {
        console.error('❌ Team insert failed:', teamError);
        throw new Error('Team creation failed');
    }

    console.log('✅ Team created:', team);

    // 2. Promote user and associate with team
    const { error: updateError } = await supabase
        .from('users_auth')
        .update({ team_id: team.id, is_coach: true })
        .eq('id', user.id);

    if (updateError) {
        console.error('❌ User update failed:', updateError);
        throw new Error('User update failed');
    }

    console.log('✅ User updated with team_id:', team.id);

    return team;
}