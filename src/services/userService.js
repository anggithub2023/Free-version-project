import supabase from '../lib/supabaseClient';

export const ensureUserExists = async (userId) => {
    if (!userId) return;

    const { error } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', userId)
        .single();

    if (error && error.code === 'PGRST116') {
        console.warn('Creating new user in Supabase...');
        await supabase.from('users').insert({ user_id: userId });
    }
};