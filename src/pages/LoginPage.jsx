import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const redirectParam = new URLSearchParams(location.search).get('redirectTo');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (loginError || !data?.user) {
            setErrorMsg(loginError?.message || 'Login failed');
            setLoading(false);
            return;
        }

        const user = data.user;

        // Check profile
        const { data: existingUser, error: fetchError } = await supabase
            .from('users_auth')
            .select('team_id, is_coach, full_name')
            .eq('id', user.id)
            .maybeSingle();

        if (fetchError) {
            setErrorMsg('Failed to fetch user profile');
            setLoading(false);
            return;
        }

        // Create profile if missing
        if (!existingUser) {
            const { error: insertError } = await supabase.from('users_auth').insert({
                id: user.id,
                full_name: user.user_metadata?.full_name || user.email,
                is_coach: false,
                created_at: new Date().toISOString(),
                email: user.email
            });

            if (insertError) {
                setErrorMsg('Could not create user profile');
                setLoading(false);
                return;
            }

            // ✅ Redirect after new user
            if (redirectParam) {
                navigate(redirectParam);
            } else {
                navigate('/get-started');
            }

            setLoading(false);
            return;
        }

        // ✅ Redirect immediately if redirectTo exists
        if (redirectParam) {
            navigate(redirectParam);
            setLoading(false);
            return;
        }

        // Otherwise normal route
        localStorage.setItem('team_id', existingUser.team_id || '');

        if (!existingUser.team_id) {
            navigate('/get-started');
        } else {
            const destination = existingUser.is_coach
                ? '/scheduling/coach'
                : '/scheduling/events';
            navigate(destination);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-20 px-4 font-sans">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
                {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}