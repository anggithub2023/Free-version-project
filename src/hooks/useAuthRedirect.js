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
            listener?.unsubscribe();
        };
    }, [navigate]);

    async function handleRedirect(user) {
        const userId = user.id;
        const fullName = user.user_metadata?.full_name || user.email || 'Anonymous';

        // Check if user already exists
        const { data: existingUser, error: fetchError } = await supabase
            .from('users_auth')
            .select('team_id, is_coach')
            .eq('id', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('❌ Failed to fetch profile:', fetchError.message);
            return;
        }

        const isNewUser = !existingUser;

        // ⛑️ Only upsert if brand new user
        if (isNewUser) {
            const { error: insertError } = await supabase.from('users_auth').upsert({
                id: userId,
                full_name: fullName,
                is_coach: false,
                created_at: new Date().toISOString(),
            });

            if (insertError) {
                console.error('🛑 Upsert error:', insertError.message);
                return;
            }
        }

        const profile = existingUser || {
            team_id: null,
            is_coach: false,
        };

        localStorage.setItem('team_id', profile.team_id);

        const destination = !profile.team_id
            ? '/get-started'
            : profile.is_coach
                ? '/scheduling/coach'
                : '/scheduling/events';

        console.log('🎯 Redirecting to:', destination);
        setTimeout(() => navigate(destination), 0);
    }
}