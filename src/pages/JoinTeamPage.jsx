import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function JoinTeamPage() {
    const [joinCode, setJoinCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleJoin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // ✅ Get authenticated user
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;

        if (!user) {
            setError('You must be logged in.');
            setLoading(false);
            return;
        }

        // ✅ Find team with join code
        const { data: teams, error: fetchErr } = await supabase
            .from('teams')
            .select('id')
            .eq('join_code', joinCode.trim().toUpperCase())
            .limit(1);

        if (fetchErr || !teams?.length) {
            setError('Invalid join code.');
            setLoading(false);
            return;
        }

        const teamId = teams[0].id;

        // ✅ Add user to team_memberships
        const { error: insertErr } = await supabase
            .from('team_memberships')
            .insert({
                user_id: user.id,
                team_id: teamId,
            });

        if (insertErr) {
            setError('Failed to join team. You may already be a member.');
            setLoading(false);
            return;
        }

        // ✅ Navigate to team dashboard
        navigate(`/team/${teamId}/dashboard`);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow font-sans bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">Join a Team</h2>

            <form onSubmit={handleJoin} className="space-y-4">
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 uppercase"
                    placeholder="Enter Join Code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    {loading ? 'Joining...' : 'Join Team'}
                </button>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
}