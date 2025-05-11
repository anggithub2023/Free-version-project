// src/pages/CoachProfilePage.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function CoachProfilePage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            const { data } = await supabase
                .from('users_auth')
                .select('first_name, last_name')
                .eq('id', user.id)
                .single();

            if (data) {
                setFirstName(data.first_name || '');
                setLastName(data.last_name || '');
            }

            setLoading(false);
        };

        fetchProfile();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMsg('');

        const {
            data: { user },
        } = await supabase.auth.getUser();

        await supabase
            .from('users_auth')
            .update({ first_name: firstName, last_name: lastName })
            .eq('id', user.id);

        setSaving(false);
        setSuccessMsg('✅ Profile updated successfully');
    };

    if (loading) {
        return <div className="p-6 text-center">Loading profile...</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-6 text-center">Coach Profile</h2>

            <form onSubmit={handleSave} className="space-y-4">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </form>

            {successMsg && (
                <p className="text-green-600 mt-4 text-center text-sm">{successMsg}</p>
            )}
        </div>
    );
}