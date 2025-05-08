// src/services/syncService.js
import supabase from '../lib/supabaseClient';

const getUserId = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('userId');
};

// 🔁 Normalize keys consistently for stats and scores
const normalizeStatKeys = (obj) => {
    if (!obj || typeof obj !== 'object') return {};
    return Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [
            key.trim().toLowerCase().replace(/\s+/g, '_'),
            isNaN(val) ? String(val) : Number(val),
        ])
    );
};

// ✅ Save game stats
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

// ✅ Fetch game stats
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

// ✅ Save reflection
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

// ✅ Fetch reflections
export const fetchReflections = async () => {
    const userId = getUserId();
    if (!userId) throw new Error('❌ Missing user ID from localStorage');

    try {
        const { data, error } = await supabase
            .from('reflections')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Supabase error while fetching reflections:', error.message);
            return [];
        }

        console.log(`✅ Reflections fetched from DB (${data.length} entries):`, data);

        return data.map(entry => ({
            ...entry,
            sport: entry.sport?.toLowerCase(),
            position: entry.position?.toLowerCase(),
            scores: normalizeStatKeys(entry.scores), // Important for reflection data parsing
        }));
    } catch (err) {
        console.error('❌ Unexpected failure in fetchReflections():', err.message);
        return [];
    }
};

// ✅ Ensure user exists
export const ensureUserExists = async (userId) => {
    const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

    if (error) throw error;

    if (!data) {
        const { error } = await supabase
            .from('users')
            .insert({ user_id: userId });

        if (error) throw error;
    }
};