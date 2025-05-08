// src/hooks/useCurrentUserProfile.js
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function useCurrentUserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Fetch profile from DB
    const fetchProfile = async () => {
        setLoading(true);

        const {
            data: { user },
            error: authError
        } = await supabase.auth.getUser();

        if (authError || !user) {
            setError(authError || new Error('User not authenticated'));
            setLoading(false);
            return;
        }

        const { data, error: fetchError } = await supabase
            .from('users_auth')
            .select('id, full_name, is_coach, team_id')
            .eq('id', user.id)
            .single();

        if (fetchError) {
            setError(fetchError);
        } else {
            setProfile(data);
            localStorage.setItem('user_profile', JSON.stringify(data)); // ✅ Always update
            localStorage.setItem('team_id', data.team_id); // ⬅️ Optional but ensures consistency
        }

        setLoading(false);
    };

    // ✅ Initial load from cache, then revalidate
    useEffect(() => {
        const cached = localStorage.getItem('user_profile');
        if (cached) {
            setProfile(JSON.parse(cached));
            setLoading(false);
        }

        fetchProfile(); // 🔁 Always revalidate from Supabase
    }, []);

    // ✅ Sync on login/logout/session changes
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, _session) => {
            console.log('🔁 Auth event, forcing profile refresh:', event);

            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                localStorage.removeItem('user_profile'); // ✅ clear stale
                fetchProfile(); // 🔁 re-fetch
            }

            if (event === 'SIGNED_OUT') {
                setProfile(null);
                localStorage.removeItem('user_profile');
                localStorage.removeItem('team_id');
            }
        });

        return () => listener.subscription?.unsubscribe(); // ✅ safe unsubscribe
    }, []);

    return { profile, loading, error };
}