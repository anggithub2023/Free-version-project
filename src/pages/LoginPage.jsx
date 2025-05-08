import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('🔁 useAuthRedirect hook running...');

        // 1️⃣ Immediately check session on mount
        supabase.auth.getSession().then(({ data, error }) => {
            if (error) {
                console.error('❌ getSession error:', error.message);
            } else if (data?.session?.user) {
                console.log('✅ Found existing session:', data.session);
                handleRedirect(data.session.user);
            }
        });

        // 2️⃣ Subscribe to future login events
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                console.log('📦 Auth state changed:', event);
                handleRedirect(session.user);
            }
        });

        return () => {
            listener?.subscription?.unsubscribe?.();
        };
    }, [navigate]);

    async function handleRedirect(user) {
        const userId = user.id;
        const fullName = user.user_metadata?.full_name || user.email || 'Anonymous';

        console.log('⬇️ Upserting user record:', userId, fullName);

        const { error: insertError } = await supabase.from('users_auth').upsert({
            id: userId,
            full_name: fullName,
            is_coach: false,
            created_at: new Date().toISOString()
        });

        if (insertError) {
            console.error('🛑 User upsert failed:', insertError.message);
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

        if (!profile.team_id) {
            console.warn('⚠️ No team_id — redirecting to /get-started');
            navigate('/get-started');
        } else {
            console.log('🎯 Redirecting based on role:', profile.is_coach ? 'coach' : 'player');
            localStorage.setItem('team_id', profile.team_id);
            navigate(profile.is_coach ? '/scheduling/coach' : '/scheduling/events');
        }
    }
}