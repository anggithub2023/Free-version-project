// src/services/teamService.js
import supabase from '../lib/supabaseClient';

export async function createTeam(name) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Not authenticated');

    const joinCode = crypto.randomUUID().slice(0, 6).toUpperCase();

    // 1. Create team
    const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert([{ name, join_code: joinCode }])
        .select()
        .single();
    if (teamError) throw new Error('Team creation failed');

    // 2. Promote user and associate with team
    const { error: updateError } = await supabase
        .from('users_auth')
        .update({ team_id: team.id, is_coach: true })
        .eq('id', user.id);
    if (updateError) throw new Error('User update failed');

    return team;
}