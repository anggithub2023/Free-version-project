// src/services/syncService.js

import supabase from '../lib/supabaseClient';

const getUserId = () => localStorage.getItem('userId');

/**
 * Ensure the user row exists before inserting stats or reflections.
 * Prevents FK constraint violation in Supabase.
 */
export const ensureUserExists = async (userId) => {
    const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

    if (error && error.code === 'PGRST116') {
        return supabase.from('users').insert({ id: userId });
    }

    return { data };
};

/**
 * Save a game stat entry to Supabase and fallback to localStorage.
 */
export const saveGameStat = async (statEntry) => {
    const userId = getUserId();
    if (!userId) throw new Error('Missing user ID');

    await ensureUserExists(userId); // ✅ Ensure user row exists

    const { error } = await supabase.from('game_stats').insert([
        { ...statEntry, user_id: userId }
    ]);

    if (error) throw error;

    // ✅ Hybrid: also cache locally
    const localStats = JSON.parse(localStorage.getItem('gameStats') || '[]');
    localStats.push({ ...statEntry, user_id: userId });
    localStorage.setItem('gameStats', JSON.stringify(localStats));
};

/**
 * Fetch game stats from Supabase (by user), fallback handled by calling component.
 */
export const fetchGameStats = async () => {
    const userId = getUserId();
    if (!userId) return [];

    const { data, error } = await supabase
        .from('game_stats')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

/**
 * Save reflection responses (per session) to Supabase.
 */
export const saveReflection = async (reflectionEntry) => {
    const userId = getUserId();
    if (!userId) throw new Error('Missing user ID');

    await ensureUserExists(userId);

    const { error } = await supabase.from('reflections').insert([
        { ...reflectionEntry, user_id: userId }
    ]);

    if (error) throw error;
};