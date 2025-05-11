import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

export default function CoachProfilePage() {
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) return;

            const { data, error } = await supabase
                .from('users_auth')
                .select('full_name')
                .eq('id', user.id)
                .single();

            if (!error && data?.full_name) setFullName(data.full_name);
            setLoading(false);
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) return setError('User not found');

        const { error: updateError } = await supabase
            .from('users_auth')
            .update({ full_name: fullName.trim() })
            .eq('id', user.id);

        if (updateError) {
            setError('Failed to update profile');
        } else {
            setSuccess(true);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow font-sans bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">Coach Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Saving...' : 'Save Profile'}
                </button>

                {success && (
                    <p className="text-green-600 text-center text-sm">Profile updated!</p>
                )}
                {error && (
                    <p className="text-red-600 text-center text-sm">{error}</p>
                )}
            </form>
        </div>
    );
}