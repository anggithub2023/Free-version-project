// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError || !signUpData?.user) {
            setErrorMsg(signUpError?.message || 'Signup failed');
            setLoading(false);
            return;
        }

        // Optional: check team_memberships → redirect based on existence
        const user = signUpData.user;

        const { data: teamMemberships, error: teamError } = await supabase
            .from('team_memberships')
            .select('team_id')
            .eq('user_id', user.id)
            .limit(1);

        if (teamError || !teamMemberships?.length) {
            navigate('/create-team'); // No team yet
        } else {
            const teamId = teamMemberships[0].team_id;
            navigate(`/team/${teamId}/dashboard`);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow font-sans bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>

            <form onSubmit={handleSignup} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    {loading ? 'Creating...' : 'Sign Up'}
                </button>
            </form>

            {errorMsg && <p className="text-red-500 text-sm mt-4 text-center">{errorMsg}</p>}

            <p className="mt-6 text-center text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline">Log in</a>
            </p>
        </div>
    );
}