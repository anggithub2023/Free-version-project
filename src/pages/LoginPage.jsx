import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('🔁 useAuthRedirect hook running...');

        // 1️⃣ Check session on mount
        supabase.auth.getSession().then(({ data, error }) => {
            if (error) {
                console.error('❌ getSession error:', error.message);
            } else if (data?.session?.user) {
                console.log('✅ Found existing session:', data.session);
                handleRedirect(data.session.user);
            }
        });

        // 2️⃣ Listen for future auth changes
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

        // 🔍 Try to fetch existing user first
        const { data: existing, error: fetchError } = await supabase
            .from('users_auth')
            .select('team_id, is_coach')
            .eq('id', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('❌ Failed to fetch user:', fetchError.message);
            return;
        }

        const isNew = !existing;
        const upsertPayload = {
            id: userId,
            full_name: fullName,
            created_at: new Date().toISOString()
        };

        // ✅ Only set is_coach false if user doesn't already exist
        if (isNew) {
            upsertPayload.is_coach = false;
        }

        const { error: insertError } = await supabase
            .from('users_auth')
            .upsert(upsertPayload);

        if (insertError) {
            console.error('🛑 User upsert failed:', insertError.message);
            return;
        }

        const profile = existing || { ...upsertPayload, team_id: null, is_coach: false };

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