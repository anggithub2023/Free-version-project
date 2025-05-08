import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('🔁 useAuthRedirect hook running...');

        const checkSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error || !session?.user) return;
            await handleRedirect(session.user);
        };

        checkSession();

        const { data: subscription } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    console.log('📦 Auth state changed:', event);
                    await handleRedirect(session.user);
                }
            }
        );

        return () => {
            subscription?.subscription?.unsubscribe();
        };
    }, [navigate]);

    async function handleRedirect(user) {
        const { data: profile, error } = await supabase
            .from('users_auth')
            .select('team_id, is_coach')
            .eq('id', user.id)
            .single();

        if (error || !profile) {
            console.error('❌ Failed to fetch profile:', error?.message);
            return;
        }

        localStorage.setItem('team_id', profile.team_id);

        if (!profile.team_id) {
            console.warn('⚠️ Missing team_id — redirecting to /get-started');
            navigate('/get-started');
        } else {
            navigate(profile.is_coach ? '/scheduling/coach' : '/scheduling/events');
        }
    }
}