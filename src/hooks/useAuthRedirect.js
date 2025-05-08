// src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const run = async () => {
            console.log('🔁 useAuthRedirect running');

            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) return console.error('❌ Failed to get session:', error.message);

            if (session?.user) {
                await resolveRedirect(session.user);
            }
        };

        run();

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
                    console.log('📦 Auth event, forcing redirect');
                    await resolveRedirect(session.user);
                }
            }
        );

        return () => listener?.subscription?.unsubscribe();
    }, [navigate]);

    async function resolveRedirect(user) {
        // Wipe stale values before fetch
        localStorage.removeItem('user_profile');
        localStorage.removeItem('team_id');

        const { data: profile, error } = await supabase
            .from('users_auth')
            .select('id, full_name, team_id, is_coach, created_at')
            .eq('id', user.id)
            .single();

        if (error || !profile) {
            console.error('❌ Redirect failed to fetch profile:', error?.message);
            return;
        }

        const { created_at, ...cacheSafeProfile } = profile;

        // ✅ Update cache
        localStorage.setItem('user_profile', JSON.stringify(cacheSafeProfile));
        localStorage.setItem('team_id', profile.team_id);

        const destination = !profile.team_id
            ? '/get-started'
            : profile.is_coach
                ? '/scheduling/coach'
                : '/scheduling/events';

        console.log('🧭 Role:', profile.is_coach ? 'Coach' : 'Player');
        console.log('🎯 Redirecting to:', destination);
        navigate(destination);
    }
}