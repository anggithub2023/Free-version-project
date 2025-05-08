// src/services/teamService.js
import supabase from '../lib/supabaseClient';

export async function createTeam(name) {
    // 🔐 Step 1: Fetch current user
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error('🛑 Auth error or no user:', authError);
        throw new Error('Not authenticated');
    }

    console.log('🧪 Authenticated user:', user);

    // ⏳ Optional: Get session and log access token
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) console.error('🛑 Session fetch error:', sessionError);
    else console.log('🔐 Supabase session:', sessionData.session);
    console.log('🔑 Access token:', sessionData?.session?.access_token);

    // 🧬 Step 2: Generate join code
    const joinCode = crypto.randomUUID().slice(0, 6).toUpperCase();

    // 🛠️ Step 3: Insert new team
    const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert([{ name, join_code: joinCode }])
        .select()
        .single(); // Will fail unless SELECT policy exists

    if (teamError) {
        console.error('❌ Team insert failed:', teamError);
        throw new Error('Team creation failed');
    }

    console.log('✅ Team created:', team);

    // 👤 Step 4: Promote user and link to team
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