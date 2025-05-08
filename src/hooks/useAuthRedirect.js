import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('🔁 useAuthRedirect hook running...');

        const run = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error || !session?.user) {
                    console.warn('⚠️ No active session');
                    return;
                }

                console.log('✅ Found session, redirecting...');
                await handleRedirect(session.user);
            } catch (err) {
                console.error('🛑 Session fetch failed:', err);
            }
        };

        run();

        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                console.log('📦 Auth state changed:', event);
                await handleRedirect(session.user);
            }
        });

        return () => {
            listener?.subscription?.unsubscribe?.();
        };
    }, [navigate]);

    async function handleRedirect(user) {
        try {
            const userId = user.id;
            const fullName = user.user_metadata?.full_name || user.email || 'Anonymous';

            console.log('👤 Handling user:', userId, fullName);

            const { data: profile, error } = await supabase
                .from('users_auth')
                .select('team_id, is_coach')
                .eq('id', userId)
                .single();

            if (error || !profile) {
                console.error('❌ Failed to fetch profile:', error?.message);
                return;
            }

            localStorage.setItem('team_id', profile.team_id);

            if (!profile.team_id) {
                console.warn('⚠️ Missing team_id, redirecting to /get-started');
                navigate('/get-started');
            } else {
                const dest = profile.is_coach ? '/scheduling/coach' : '/scheduling/events';
                console.log('🎯 Redirecting to:', dest);
                navigate(dest);
            }
        } catch (err) {
            console.error('🔥 Unexpected error during redirect:', err);
        }
    }
}