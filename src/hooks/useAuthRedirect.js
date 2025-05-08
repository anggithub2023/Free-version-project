import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const run = async () => {
            console.log('🔁 useAuthRedirect running');

            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                await resolveRedirect(session.user);
            }
        };

        run();

        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
                console.log('📦 Auth event, forcing redirect');
                await resolveRedirect(session.user);
            }
        });

        return () => {
            listener?.subscription?.unsubscribe();
        };
    }, [navigate]);

    async function resolveRedirect(user) {
        localStorage.removeItem('user_profile');
        localStorage.removeItem('team_id');

        const { data: profile, error } = await supabase
            .from('users_auth')
            .select('id, full_name, team_id, is_coach')
            .eq('id', user.id)
            .single();

        if (error || !profile) {
            console.error('❌ Redirect failed to fetch profile:', error?.message);
            return;
        }

        console.log('🧭 Auth redirect: user role:', profile.is_coach ? 'Coach' : 'Player');

        // Save for use elsewhere
        localStorage.setItem('user_profile', JSON.stringify(profile));
        localStorage.setItem('team_id', profile.team_id);

        const dest = !profile.team_id
            ? '/get-started'
            : profile.is_coach
                ? '/scheduling/coach'
                : '/scheduling/events';

        console.log('🎯 Redirecting to:', dest);
        navigate(dest);
    }
}