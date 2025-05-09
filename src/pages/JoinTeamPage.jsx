// src/pages/JoinTeamPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export default function JoinTeamPage() {
    const { profile, loading: profileLoading, error: profileError } = useCurrentUserProfile();
    const [joinCode, setJoinCode] = useState('');
    const [team, setTeam] = useState(null);
    const [feedback, setFeedback] = useState({ error: '', success: '' });
    const [joining, setJoining] = useState(false);
    const navigate = useNavigate();

    const handleCheckCode = async () => {
        setFeedback({ error: '', success: '' });
        setTeam(null);

        const { data, error } = await supabase
            .from('teams')
            .select('*')
            .eq('join_code', joinCode.trim())
            .single();

        if (error || !data) {
            setFeedback({ error: 'Invalid join code. Please try again.', success: '' });
        } else {
            setTeam(data);
        }
    };

    const handleJoinTeam = async () => {
        setJoining(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return alert('You must be logged in to join a team.');

        const { error } = await supabase
            .from('users_auth')
            .update({ team_id: team.id })
            .eq('id', user.id);

        if (error) {
            setFeedback({ error: 'Failed to join team. Try again.', success: '' });
        } else {
            setFeedback({ error: '', success: 'Successfully joined! Redirecting...' });
            setTimeout(() => navigate('/dashboard'), 1500);
        }
        setJoining(false);
    };

    if (profileLoading) return <p className="text-center mt-10">Loading...</p>;
    if (profileError) return <p className="text-center text-red-500">Error: {profileError.message}</p>;
    if (profile?.team_id) {
        return <p className="text-center mt-10 text-gray-600">You are already part of a team.</p>;
    }

    return (
        <div className="min-h-screen bg-white text-gray-800 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Join a Team</h1>

            <div className="max-w-sm mx-auto space-y-4">
                <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Enter Join Code"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />

                <button
                    onClick={handleCheckCode}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
                >
                    Check Code
                </button>

                {team && (
                    <div className="p-4 border border-green-300 bg-green-50 rounded-lg">
                        <p><strong>Team:</strong> {team.name}</p>
                        <button
                            onClick={handleJoinTeam}
                            disabled={joining}
                            className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
                        >
                            {joining ? 'Joining...' : 'Confirm Join'}
                        </button>
                    </div>
                )}

                {feedback.error && <p className="text-red-500">{feedback.error}</p>}
                {feedback.success && <p className="text-green-600">{feedback.success}</p>}

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don’t have a team?{' '}
                    <a href="/team-management" className="text-blue-600 hover:underline">
                        Create one instead
                    </a>
                </p>
            </div>
        </div>
    );
}