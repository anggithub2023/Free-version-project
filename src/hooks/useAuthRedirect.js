// src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                const { data: profile, error } = await supabase
                    .from('users')
                    .select('team_id')
                    .eq('id', session.user.id)
                    .single();

                if (error) {
                    console.error('Failed to fetch team info:', error.message);
                    return;
                }

                // ✅ Store team_id in localStorage or global state
                localStorage.setItem('team_id', profile.team_id);
                navigate('/scheduling/coach');
            }
        });

        return () => subscription.unsubscribe();
    }, []);
}