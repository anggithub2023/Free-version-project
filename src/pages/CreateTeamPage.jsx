// src/pages/CreateTeamPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function CreateTeamPage() {
    const [teamName, setTeamName] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const generateJoinCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;

        if (!user) {
            setError('Not authenticated');
            setLoading(false);
            return;
        }

        // Check for duplicate team
        const { data: existing, error: dupCheckErr } = await supabase
            .from('teams')
            .select('id')
            .ilike('name', teamName)
            .ilike('location', location);

        if (dupCheckErr) {
            setError('Error checking for duplicate teams');
            setLoading(false);
            return;
        }

        if (existing && existing.length > 0) {
            setError('A team with this name and location already exists.');
            setLoading(false);
            return;
        }

        const joinCode = generateJoinCode();

        const { data: team, error: teamErr } = await supabase
            .from('teams')
            .insert({
                name: teamName,
                location: location,
                created_by: user.id,
                join_code: joinCode,
            })
            .select()
            .single();

        if (teamErr) {
            setError(teamErr.message);
            setLoading(false);
            return;
        }

        await supabase.from('team_memberships').insert({
            user_id: user.id,
            team_id: team.id,
        });

        navigate(`/team/${team.id}/dashboard`);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow font-sans bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Team</h2>
            <form onSubmit={handleCreate} className="space-y-4">
                <input
                    type="text"
                    placeholder="Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    {loading ? 'Creating...' : 'Create Team'}
                </button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
}