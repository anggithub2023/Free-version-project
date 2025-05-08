// src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('🔁 useAuthRedirect hook running...');

        // 1️⃣ Check session immediately on mount
        supabase.auth.getSession().then(({ data, error }) => {
            if (error) {
                console.error('❌ getSession error:', error.message);
                return;
            }
            const user = data?.session?.user;
            if (user) {
                console.log('✅ Found existing session:', user);
                handleRedirect(user);
            }
        });

        // 2️⃣ Subscribe to future login events
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                console.log('📦 Auth state changed:', event);
                handleRedirect(session.user);
            }
        });

        return () => {
            authListener?.subscription?.unsubscribe?.();
        };
    }, [navigate]);

    async function handleRedirect(user) {
        const userId = user.id;
        const email = user.email;
        const fullName = user.user_metadata?.full_name || email || 'Anonymous';

        console.log('⬇️ Upserting user record:', userId, email);

        const { error: upsertError } = await supabase.from('users_auth').upsert({
            id: userId,
            full_name: fullName,
            is_coach: false,
            created_at: new Date().toISOString()
        });

        if (upsertError) {
            console.error('🛑 Upsert failed:', upsertError.message);
            return;
        }

        const { data: profile, error: fetchError } = await supabase
            .from('users_auth')
            .select('team_id, is_coach')
            .eq('id', userId)
            .single();

        if (fetchError || !profile) {
            console.error('❌ Failed to fetch profile:', fetchError?.message);
            return;
        }

        localStorage.setItem('team_id', profile.team_id);
        console.log('🎯 Redirecting to:', profile.is_coach ? '/scheduling/coach' : '/scheduling/events');

        if (!profile.team_id) {
            navigate('/get-started');
        } else {
            navigate(profile.is_coach ? '/scheduling/coach' : '/scheduling/events');
        }
    }
}