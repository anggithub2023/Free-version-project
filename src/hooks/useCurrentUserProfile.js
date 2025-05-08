import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function useCurrentUserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            // ✅ Always force fresh profile
            localStorage.removeItem('user_profile');

            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                setError(userError || new Error('Not authenticated'));
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

        load();
    }, []);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                console.log('🔁 Auth event, forcing profile refresh');
                localStorage.removeItem('user_profile');
                setProfile(null);
                setLoading(true);
                supabase.auth.getUser().then(({ data: { user } }) => {
                    if (user) {
                        supabase
                            .from('users_auth')
                            .select('id, full_name, is_coach, team_id')
                            .eq('id', user.id)
                            .single()
                            .then(({ data, error }) => {
                                if (data) {
                                    setProfile(data);
                                    localStorage.setItem('user_profile', JSON.stringify(data));
                                } else {
                                    setError(error);
                                }
                                setLoading(false);
                            });
                    } else {
                        setLoading(false);
                    }
                });
            }

            if (event === 'SIGNED_OUT') {
                setProfile(null);
                localStorage.removeItem('user_profile');
            }
        });

        return () => listener?.subscription?.unsubscribe();
    }, []);

    return { profile, loading, error };
}