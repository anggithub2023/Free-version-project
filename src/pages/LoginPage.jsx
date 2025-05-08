// src/pages/LoginPage.jsx
import { useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert('❌ Login failed: ' + error.message);
        } else {
            console.log('✅ Logged in successfully');
        }
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto mt-20">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded"
                required
            />
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">
                Sign In
            </button>
        </form>
    );
}