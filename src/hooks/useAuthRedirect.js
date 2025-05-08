// src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event !== 'SIGNED_IN' || !session?.user) return;

            try {
                const user = session.user;
                const userId = user.id;
                const email = user.email;
                const fullName = user.user_metadata?.full_name || email || 'Anonymous';

                // ✅ Upsert into users_auth table
                const { error: insertError } = await supabase.from('users_auth').upsert({
                    id: userId,
                    full_name: fullName,
                    is_coach: false, // default, can change after team creation
                    created_at: new Date().toISOString()
                });

                if (insertError) {
                    console.error('🛑 User upsert failed:', insertError.message);
                    return;
                }

                // ✅ Fetch profile to determine next route
                const { data: profile, error: fetchError } = await supabase
                    .from('users_auth')
                    .select('team_id, is_coach')
                    .eq('id', userId)
                    .single();

                if (fetchError || !profile) {
                    console.error('❌ Failed to fetch profile:', fetchError?.message);
                    return;
                }

                // ✅ Conditional redirect based on team membership and role
                if (!profile.team_id) {
                    console.warn('⚠️ No team_id — redirecting to /get-started');
                    navigate('/get-started');
                } else {
                    localStorage.setItem('team_id', profile.team_id);
                    navigate(profile.is_coach ? '/scheduling/coach' : '/scheduling/events');
                }
            } catch (err) {
                console.error('🔥 Unexpected auth redirect error:', err);
            }
        });

        return () => {
            subscription.unsubscribe(); // ✅ proper cleanup
        };
    }, [navigate]);
}