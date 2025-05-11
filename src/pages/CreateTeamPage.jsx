import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function CreateTeamPage() {
    const [teamName, setTeamName] = useState('');
    const [location, setLocation] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            setErrorMsg('User not authenticated');
            setLoading(false);
            return;
        }

        // 1. Check for duplicate team (by name + location)
        const { data: existingTeams, error: checkError } = await supabase
            .from('teams')
            .select('id')
            .ilike('name', teamName.trim())
            .ilike('location', location.trim());

        if (checkError) {
            setErrorMsg('Error checking for existing teams');
            setLoading(false);
            return;
        }

        if (existingTeams.length > 0) {
            setErrorMsg('Team already exists in this location.');
            setLoading(false);
            return;
        }

        // 2. Create team
        const { data: newTeam, error: teamError } = await supabase
            .from('teams')
            .insert([
                {
                    name: teamName.trim(),
                    location: location.trim(),
                    created_by: user.id,
                },
            ])
            .select()
            .single();

        if (teamError || !newTeam) {
            setErrorMsg('Failed to create team');
            setLoading(false);
            return;
        }

        // 3. Add to team_memberships
        const { error: membershipError } = await supabase.from('team_memberships').insert([
            {
                team_id: newTeam.id,
                user_id: user.id,
            },
        ]);

        if (membershipError) {
            setErrorMsg('Failed to assign team membership');
            setLoading(false);
            return;
        }

        // 4. Update user to mark as coach and attach team
        const { error: userUpdateErr } = await supabase
            .from('users_auth')
            .update({ is_coach: true, team_id: newTeam.id })
            .eq('id', user.id);

        if (userUpdateErr) {
            setErrorMsg('Failed to update user profile');
            setLoading(false);
            return;
        }

        navigate(`/team/${newTeam.id}/dashboard`);
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow font-sans bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">Create a Team</h2>

            <form onSubmit={handleCreateTeam} className="space-y-4">
                <input
                    type="text"
                    placeholder="Team Name"
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Location"
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Creating...' : 'Create Team'}
                </button>

                {errorMsg && <p className="text-red-500 mt-2 text-center text-sm">{errorMsg}</p>}
            </form>
        </div>
    );
}