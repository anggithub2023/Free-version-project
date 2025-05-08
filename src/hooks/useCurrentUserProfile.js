import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function useCurrentUserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cached = localStorage.getItem('user_profile');
        if (cached) {
            setProfile(JSON.parse(cached));
            setLoading(false);
        }

        fetchProfile(); // Always revalidate
    }, []);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, _session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                console.log('🔁 Auth event, forcing profile refresh');
                localStorage.removeItem('user_profile'); // 🧹 Remove stale profile
                fetchProfile(); // ✅ Always re-fetch
            }
            if (event === 'SIGNED_OUT') {
                console.log('🚪 Signed out, clearing profile');
                setProfile(null);
                localStorage.removeItem('user_profile');
            }
        });

        return () => listener.subscription?.unsubscribe(); // Prevent memory leak
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