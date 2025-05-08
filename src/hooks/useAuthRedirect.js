import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                const user = session.user;
                const userId = user.id;
                const email = user.email;
                const fullName = user.user_metadata?.full_name || email || 'Anonymous';

                // ✅ Upsert into users_auth
                const { error: insertError } = await supabase.from('users_auth').upsert({
                    id: userId,
                    full_name: fullName,
                    is_coach: false, // or false if you want to toggle later
                    created_at: new Date().toISOString()
                });

                if (insertError) {
                    console.error('User upsert failed:', insertError.message);
                    return;
                }

                // ✅ Fetch profile (with team_id + is_coach)
                const { data: profile, error: fetchError } = await supabase
                    .from('users_auth')
                    .select('team_id, is_coach')
                    .eq('id', userId)
                    .single();

                if (fetchError) {
                    console.error('Failed to fetch user profile:', fetchError.message);
                    return;
                }

                if (profile?.team_id) {
                    localStorage.setItem('team_id', profile.team_id);
                } else {
                    console.warn('No team_id found for user — redirecting to /join-team');
                    navigate('/get-started');
                    return;
                }

                // ✅ Redirect based on role
                if (profile.is_coach) {
                    navigate('/scheduling/coach');
                } else {
                    navigate('/scheduling/events');
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);
}