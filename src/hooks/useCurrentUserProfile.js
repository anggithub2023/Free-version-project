import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function useCurrentUserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            const {
                data: { user },
                error: authError
            } = await supabase.auth.getUser();

            if (authError || !user) {
                setError(authError || new Error('User not found'));
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
            }

            setLoading(false);
        };

        fetchProfile();
    }, []);

    return { profile, loading, error };
}