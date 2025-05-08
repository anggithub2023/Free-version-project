// src/services/teamService.js
import supabase from '../lib/supabaseClient';

export async function createTeam(name) {
    // 🔐 Get authenticated user
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error('🛑 Auth error or no user:', authError);
        throw new Error('Not authenticated');
    }

    console.log('🧪 Authenticated user:', user);

    // 🧪 Inspect active session/token
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
        console.error('🛑 Session fetch error:', sessionError);
    } else {
        console.log('🔐 Supabase session:', sessionData.session);
        console.log('🔑 Access token:', sessionData.session?.access_token);
    }

    // 🔑 Generate a join code
    const joinCode = crypto.randomUUID().slice(0, 6).toUpperCase();

    // 🚀 Step 1: Create team
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

    // 🚀 Step 2: Update user's team_id and coach status
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