// src/services/syncService.js
import supabase from '../lib/supabaseClient';

const getUserId = () => localStorage.getItem('userId');

// Normalize stat keys consistently
const normalizeStatKeys = (statsObj) => {
    if (!statsObj || typeof statsObj !== 'object') return {};

    return Object.fromEntries(
        Object.entries(statsObj).map(([key, val]) => [
            key.trim().toLowerCase().replace(/\s+/g, '_'),
            isNaN(val) ? val : Number(val),
        ])
    );
};

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

    const { error } = await supabase.from('game_stats').insert([normalizedStatEntry]);
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

    return data.map(entry => ({
        ...entry,
        sport: entry.sport?.toLowerCase(),
        position: entry.position?.toLowerCase(),
        stats: normalizeStatKeys(entry.stats),
    }));
};

export const saveReflection = async (reflectionEntry) => {
    const userId = getUserId();
    if (!userId) throw new Error('Missing user ID');

    const { error } = await supabase.from('reflections').insert([
        { ...reflectionEntry, user_id: userId }
    ]);

    if (error) throw error;
};

export const fetchReflections = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('Missing user ID');

    const { data, error } = await supabase
        .from('reflections')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;

    console.log('✅ Reflections fetched from DB:', data);
    return data || [];
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