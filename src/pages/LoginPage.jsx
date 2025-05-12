import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        // 🔐 Sign in
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError || !authData?.user) {
            setErrorMsg(authError?.message || 'Login failed');
            setLoading(false);
            return;
        }

        const user = authData.user;

        // 🧠 Check team membership
        const { data: teamMemberships, error: teamError } = await supabase
            .from('team_memberships')
            .select('team_id')
            .eq('user_id', user.id)
            .limit(1);

        if (teamError) {
            setErrorMsg('Error loading teams.');
            setLoading(false);
            return;
        }

        // 🚦 Redirect
        if (teamMemberships?.length) {
            const teamId = teamMemberships[0].team_id;
            navigate(`/team/${teamId}/admin`);
        } else {
            navigate('/create-team');
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow font-sans bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {errorMsg && (
                    <p className="text-red-500 mt-2 text-center text-sm">{errorMsg}</p>
                )}
            </form>

            <p className="mt-6 text-center text-sm">
                Don’t have an account?{' '}
                <a href="/signup" className="text-blue-600 hover:underline">
                    Create one here
                </a>
            </p>
        </div>
    );
}