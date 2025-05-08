import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('🔁 LoginPage mounted...');

        const init = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('❌ Failed to get session:', error.message);
                setLoading(false);
                return;
            }

            if (session?.user) {
                console.log('✅ Active session found, redirecting...');
                await handleRedirect(session.user);
            } else {
                setLoading(false); // No session: render login UI
            }
        };

        init();

        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                console.log('📦 Auth SIGNED_IN event:', session.user.id);
                await handleRedirect(session.user);
            }
        });

        return () => {
            listener?.subscription?.unsubscribe?.();
        };
    }, [navigate]);

    async function handleRedirect(user) {
        const userId = user.id;

        const { data: profile, error } = await supabase
            .from('users_auth')
            .select('team_id, is_coach')
            .eq('id', userId)
            .single();

        // ...rest of logic

        if (error || !profile) {
            console.error('❌ Failed to fetch profile during login:', error?.message);
            return;
        }

        localStorage.setItem('team_id', profile.team_id);

        if (!profile.team_id) {
            console.warn('⚠️ No team_id — redirecting to /get-started');
            navigate('/get-started');
        } else {
            const dest = profile.is_coach ? '/scheduling/coach' : '/scheduling/events';
            console.log('🎯 Redirecting to:', dest);
            navigate(dest);
        }
    }

    if (loading) {
        return <p className="text-center mt-10">Loading session...</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg font-['Inter']">
            <h1 className="text-2xl font-bold text-center mb-4">Welcome to ProcessWins</h1>
            <p className="text-center text-gray-500 mb-6">Please sign in to continue</p>
            <button
                onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded"
            >
                Sign in with Google
            </button>
        </div>
    );
}