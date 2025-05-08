import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('🔁 useAuthRedirect hook running...');

        const run = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error || !session?.user) return;

            await handleRedirect(session.user);
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
        const userId = user.id;
        const fullName = user.user_metadata?.full_name || user.email || 'Anonymous';

        // Check for existing role
        const { data: existingUser } = await supabase
            .from('users_auth')
            .select('is_coach')
            .eq('id', userId)
            .single();

        const isCoach = existingUser?.is_coach ?? false;

        const { error: upsertError } = await supabase.from('users_auth').upsert({
            id: userId,
            full_name: fullName,
            is_coach: isCoach,
            created_at: new Date().toISOString(),
        });

        if (upsertError) {
            console.error('🛑 Upsert error:', upsertError.message);
            return;
        }

        const { data: profile, error: profileError } = await supabase
            .from('users_auth')
            .select('team_id, is_coach')
            .eq('id', userId)
            .single();

        if (profileError || !profile) {
            console.error('❌ Failed to fetch profile:', profileError?.message);
            return;
        }

        localStorage.setItem('team_id', profile.team_id);

        if (!profile.team_id) {
            console.warn('⚠️ No team — go to /get-started');
            navigate('/get-started');
        } else {
            const destination = profile.is_coach ? '/scheduling/coach' : '/scheduling/events';
            console.log('🎯 Redirecting to:', destination);
            navigate(destination);
        }
    }
}