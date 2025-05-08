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

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    console.log('📦 Auth state changed:', event);
                    await handleRedirect(session.user);
                }
            }
        );

        return () => {
            listener?.unsubscribe(); // ✅ FIXED
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

        const destination = !profile.team_id
            ? '/get-started'
            : profile.is_coach
                ? '/scheduling/coach'
                : '/scheduling/events';

        console.log('🎯 Redirecting to:', destination);
        setTimeout(() => navigate(destination), 0); // ✅ fallback-safe
    }
}