import supabase from '../lib/supabaseClient';

/**
 * Links invited_email to user_id and returns all teams user belongs to
 */
export async function resolveTeamAccess(userId, email) {
    if (!userId || !email) return [];

    // Step 1: Claim any invited slots
    await supabase
        .from('team_memberships')
        .update({ user_id: userId })
        .eq('invited_email', email)
        .is('user_id', null);

    // Step 2: Get all team memberships
    const { data, error } = await supabase
        .from('team_memberships')
        .select('team_id')
        .eq('user_id', userId);

    if (error) {
        console.error('resolveTeamAccess error:', error.message);
        return [];
    }

    return data;
}