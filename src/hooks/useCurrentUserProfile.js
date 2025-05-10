// src/hooks/useCurrentUserProfile.js
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function useCurrentUserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cached = localStorage.getItem('user_profile');
        if (cached) {
            try {
                setProfile(JSON.parse(cached));
                setLoading(false);
            } catch (e) {
                console.error('❌ Failed to parse cached profile:', e);
            }
        }

        fetchProfile(); // Always revalidate
    }, []);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, _session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                fetchProfile();
            }
            if (event === 'SIGNED_OUT') {
                setProfile(null);
                localStorage.removeItem('user_profile');
                localStorage.removeItem('team_id');
            }
        });

        return () => listener.subscription?.unsubscribe();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            setError(authError || new Error('User not authenticated'));
            setLoading(false);
            return;
        }

        const { data, error: fetchError } = await supabase
            .from('users_auth')
            .select('id, full_name, is_coach, team_id, created_at')
            .eq('id', user.id)
            .single();

        if (fetchError) {
            setError(fetchError);
        } else {
            const { created_at, ...profileToCache } = data;
            setProfile(profileToCache);
            localStorage.setItem('user_profile', JSON.stringify(profileToCache));
            localStorage.setItem('team_id', profileToCache.team_id); // ✅ new line
        }

        setLoading(false);
    };

    return { profile, loading, error };
}