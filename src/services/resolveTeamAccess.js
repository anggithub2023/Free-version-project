import supabase from '../lib/supabaseClient';

/**
 * Resolves team access for a logged-in user by:
 * 1. Linking any pending invites (matching invited_email).
 * 2. Returning all teams this user belongs to.
 *
 * @param {string} userId - Supabase Auth User ID
 * @param {string} email - Authenticated user's email
 * @returns {Promise<Array>} Array of team memberships
 */
export async function resolveTeamAccess(userId, email) {
    if (!userId || !email) {
        console.warn('resolveTeamAccess: Missing userId or email');
        return [];
    }

    // Step 1: Link any pending invites
    await supabase
        .from('team_memberships')
        .update({ user_id: userId })
        .eq('invited_email', email)
        .is('user_id', null); // only update unclaimed invites

    // Step 2: Fetch all team memberships for this user
    const { data, error } = await supabase
        .from('team_memberships')
        .select('team_id, role, teams (name, location)')
        .eq('user_id', userId);

    if (error) {
        console.error('resolveTeamAccess error:', error.message);
        return [];
    }

    return data;
}