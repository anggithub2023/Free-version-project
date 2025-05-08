// src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('🔁 useAuthRedirect hook running...');

        const checkSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error || !session?.user) {
                console.warn('⚠️ No active session found');
                return;
            }
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
            listener?.unsubscribe(); // ✅ safe cleanup
        };
    }, [navigate]);

    async function handleRedirect(user) {
        const userId = user.id;
        const fullName = user.user_metadata?.full_name || user.email || 'Anonymous';

        const { data: existing, error: fetchError } = await supabase
            .from('users_auth')
            .select('team_id, is_coach')
            .eq('id', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('❌ Failed to fetch user:', fetchError.message);
            return;
        }

        const isNewUser = !existing;

        const upsertPayload = {
            id: userId,
            full_name: fullName,
            created_at: new Date().toISOString()
        };

        if (isNewUser) {
            upsertPayload.is_coach = false; // Default role
        }

        const { error: upsertError } = await supabase
            .from('users_auth')
            .upsert(upsertPayload);

        if (upsertError) {
            console.error('🛑 Upsert failed:', upsertError.message);
            return;
        }

        const profile = existing || { ...upsertPayload, team_id: null, is_coach: false };

        // 🧠 Deep diagnostic logging
        console.log('🧠 Profile decision breakdown:');
        console.log('team_id:', profile.team_id);
        console.log('is_coach:', profile.is_coach);

        localStorage.setItem('team_id', profile.team_id);

        const destination = !profile.team_id
            ? '/get-started'
            : profile.is_coach
                ? '/scheduling/coach'
                : '/scheduling/events';

        console.log('🎯 Final redirect path:', destination);
        navigate(destination);
    }
}