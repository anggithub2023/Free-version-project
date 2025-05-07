import supabase from '../lib/supabaseClient';

export async function createTeam(teamName) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Not authenticated');

    const join_code = crypto.randomUUID().slice(0, 6);

    // Step 1: Create the team
    const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert([{ name: teamName, join_code }])
        .select()
        .single();

    if (teamError) throw teamError;

    // Step 2: Update the user to be a coach
    const { error: updateError } = await supabase
        .from('users')
        .update({ is_coach: true, team_id: team.id })
        .eq('id', user.id);

    if (updateError) throw updateError;

    return team;
}