// src/services/syncService.js
import supabase from '../lib/supabaseClient';

const getUserId = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('userId');
};

// 🔁 Normalize stat keys for consistency
const normalizeStatKeys = (statsObj) => {
    if (!statsObj || typeof statsObj !== 'object') return {};

    return Object.fromEntries(
        Object.entries(statsObj).map(([key, val]) => [
            key.trim().toLowerCase().replace(/\s+/g, '_'),
            isNaN(val) ? String(val) : Number(val),
        ])
    );
};

// ✅ Save a game stat entry
export const saveGameStat = async (statEntry) => {
    const userId = getUserId();
    if (!userId) throw new Error('Missing user ID');

    const normalizedStatEntry = {
        user_id: userId,
        sport: statEntry.sport?.toLowerCase(),
        position: statEntry.position?.toLowerCase(),
        stats: normalizeStatKeys(statEntry.stats),
        date: statEntry.date,
    };

    console.log('📊 Saving game stat:', normalizedStatEntry);
    const { error } = await supabase.from('game_stats').insert([normalizedStatEntry]);
    if (error) throw error;
};

// ✅ Fetch all game stats for current user
export const fetchGameStats = async () => {
    const userId = getUserId();
    if (!userId) throw new Error('Missing user ID');

    const { data, error } = await supabase
        .from('game_stats')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(entry => ({
        ...entry,
        sport: entry.sport?.toLowerCase(),
        position: entry.position?.toLowerCase(),
        stats: normalizeStatKeys(entry.stats),
    }));
};

// ✅ Save a reflection entry
export const saveReflection = async (reflectionEntry) => {
    const userId = getUserId();
    if (!userId) throw new Error('Missing user ID');

    const normalizedReflection = {
        ...reflectionEntry,
        user_id: userId,
        sport: reflectionEntry.sport?.toLowerCase(),
        position: reflectionEntry.position?.toLowerCase(),
    };

    console.log('📝 Saving reflection:', normalizedReflection);
    const { error } = await supabase.from('reflections').insert([normalizedReflection]);
    if (error) throw error;
};

// ✅ Fetch reflections for current user
export const fetchReflections = async () => {
    const userId = getUserId();
    if (!userId) throw new Error('Missing user ID');

    const { data, error } = await supabase
        .from('reflections')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;

    console.log('✅ Reflections fetched from DB:', data);
    return data;
};

// ✅ Ensure the user exists in the DB (for analytics + sync)
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
