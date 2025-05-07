// src/pages/JoinTeamPage.jsx
import React, { useState } from 'react';
import supabase from 'src/lib/supabaseClient.js'; // ✅ Default import from unified client
import { useNavigate } from 'react-router-dom';

export default function JoinTeamPage() {
    const [code, setCode] = useState('');
    const [team, setTeam] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleCheckCode = async () => {
        setError('');
        setTeam(null);
        const { data, error } = await supabase
            .from('teams')
            .select('*')
            .eq('join_code', code.trim())
            .single();

        if (error || !data) {
            setError('Invalid join code. Please try again.');
            return;
        }
        setTeam(data);
    };

    const handleJoinTeam = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return alert('You must be logged in to join a team.');

        const { error } = await supabase
            .from('users')
            .update({ team_id: team.id })
            .eq('id', user.id);

        if (error) {
            setError('Failed to join team. Try again.');
        } else {
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 1500);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 p-6 text-gray-800 dark:text-white">
            <h1 className="text-2xl font-bold text-center mb-6">Join a Team</h1>

            <div className="max-w-sm mx-auto space-y-4">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter Join Code"
                    className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                />
                <button
                    onClick={handleCheckCode}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
                >
                    Check Code
                </button>

                {team && (
                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-gray-800">
                        <p><strong>Team:</strong> {team.name}</p>
                        <button
                            onClick={handleJoinTeam}
                            className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
                        >
                            Confirm Join
                        </button>
                    </div>
                )}

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">Joined successfully! Redirecting...</p>}
            </div>
        </div>
    );
}