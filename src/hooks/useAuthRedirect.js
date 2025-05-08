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
            listener?.unsubscribe(); // ✅ safe unsubscribe
        };
    }, [navigate]);

    async function handleRedirect(user) {
        const userId = user.id;
        const fullName = user.user_metadata?.full_name || user.email || 'Anonymous';

        // 1️⃣ Check if user exists
        const { data: existing, error: fetchError } = await supabase
            .from('users_auth')
            .select('id')
            .eq('id', userId)
            .single();

        const isNewUser = !!fetchError || !existing;

        // 2️⃣ Prepare payload
        const upsertPayload = {
            id: userId,
            full_name: fullName,
            created_at: new Date().toISOString()
        };
        if (isNewUser) upsertPayload.is_coach = false;

        // 3️⃣ Upsert safely
        const { error: upsertError } = await supabase
            .from('users_auth')
            .upsert(upsertPayload);

        if (upsertError) {
            console.error('🛑 Upsert failed:', upsertError.message);
            return;
        }

        // 4️⃣ Always re-fetch the latest profile (in case is_coach or team_id was updated)
        const { data: profile, error: profileError } = await supabase
            .from('users_auth')
            .select('team_id, is_coach')
            .eq('id', userId)
            .single();

        if (profileError || !profile) {
            console.error('❌ Failed to load user profile:', profileError?.message);
            return;
        }

        localStorage.setItem('team_id', profile.team_id);

        const destination = !profile.team_id
            ? '/get-started'
            : profile.is_coach
                ? '/scheduling/coach'
                : '/scheduling/events';

        console.log('🎯 Redirecting to:', destination);
        navigate(destination);
    }
}