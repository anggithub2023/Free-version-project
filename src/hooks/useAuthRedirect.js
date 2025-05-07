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
                const userId = session.user.id;
                const userEmail = session.user.email;

                // ✅ Upsert user row
                const { error: insertError } = await supabase.from('users').upsert({
                    id: userId,
                    email: userEmail,
                    is_coach: true,
                    created_at: new Date().toISOString(),
                });

                if (insertError) {
                    console.error('User upsert failed:', insertError.message);
                    return;
                }

                // ✅ Get team_id
                const { data: profile, error: fetchError } = await supabase
                    .from('users')
                    .select('team_id')
                    .eq('id', userId)
                    .single();

                if (fetchError) {
                    console.error('Failed to fetch team info:', fetchError.message);
                    return;
                }

                if (profile?.team_id) {
                    localStorage.setItem('team_id', profile.team_id);
                }

                navigate('/scheduling/coach');
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);
}