// src/services/syncService.js
import supabase from '../lib/supabaseClient';

const getUserId = () => localStorage.getItem('userId');

export const saveGameStat = async (statEntry) => {
    const userId = getUserId();
    if (!userId) throw new Error('Missing user ID');

    const { error } = await supabase.from('game_stats').insert([
        { ...statEntry, user_id: userId }
    ]);

    if (error) throw error;
};

export const fetchGameStats = async () => {
    const userId = getUserId();
    if (!userId) throw new Error('Missing user ID');

    const { data, error } = await supabase
        .from('game_stats')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

export const saveReflection = async (reflectionEntry) => {
    const userId = getUserId();
    if (!userId) throw new Error('Missing user ID');

    const { error } = await supabase.from('reflections').insert([
        { ...reflectionEntry, user_id: userId }
    ]);

    if (error) throw error;
};

export const ensureUserExists = async (userId) => {
    const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

    if (error) throw error;

    if (!data) {
        const { error: insertError } = await supabase
            .from('users')
            .insert({ user_id: userId });

        if (insertError) throw insertError;
    }
};