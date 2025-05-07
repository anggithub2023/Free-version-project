import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function useCurrentUserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔁 Load from localStorage (if available) immediately
    useEffect(() => {
        const cached = localStorage.getItem('user_profile');
        if (cached) {
            setProfile(JSON.parse(cached));
            setLoading(false); // Show cached instantly
        }

        fetchProfile(); // Always revalidate
    }, []);

    // 🔄 Watch for auth changes and react
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, _session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                fetchProfile(); // revalidate on sign-in or refresh
            }
            if (event === 'SIGNED_OUT') {
                setProfile(null);
                localStorage.removeItem('user_profile');
            }
        });

        return () => listener?.unsubscribe();
    }, []);

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
            localStorage.setItem('user_profile', JSON.stringify(data));
        }

        setLoading(false);
    };

    return { profile, loading, error };
}