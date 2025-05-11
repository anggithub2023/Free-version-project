import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

function SignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'https://www.processwins.app/login',
            },
        });

        if (error) {
            setError(error.message);
        } else {
            setSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Create Your Account</h2>

                {submitted ? (
                    <div className="text-center text-green-700 font-medium">
                        ✅ Check your email to verify your account.
                    </div>
                ) : (
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
                        >
                            Sign Up
                        </button>
                    </form>
                )}

                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;