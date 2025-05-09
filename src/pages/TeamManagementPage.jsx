// src/pages/TeamManagementPage.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function TeamManagementPage() {
    const [team, setTeam] = useState(null);
    const [members, setMembers] = useState([]);
    const [editingName, setEditingName] = useState(false);
    const [teamNameInput, setTeamNameInput] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { data: profile, error: profileError } = await supabase
                    .from('users')
                    .select('team_id')
                    .eq('id', user.id)
                    .single();

                if (profileError || !profile?.team_id) {
                    setError('Unable to load team profile.');
                    return;
                }

                const { data: teamData } = await supabase
                    .from('teams')
                    .select('*')
                    .eq('id', profile.team_id)
                    .single();

                const { data: teamMembers } = await supabase
                    .from('users')
                    .select('id, full_name, email, is_coach')
                    .eq('team_id', profile.team_id);

                setTeam(teamData);
                setTeamNameInput(teamData.name);
                setMembers(teamMembers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCopyJoinCode = () => {
        if (!team?.join_code) return;
        navigator.clipboard.writeText(team.join_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRegenerateCode = async () => {
        const newCode = crypto.randomUUID().slice(0, 6);
        const { error } = await supabase
            .from('teams')
            .update({ join_code: newCode })
            .eq('id', team.id);

        if (!error) setTeam({ ...team, join_code: newCode });
    };

    const handleRenameTeam = async () => {
        const { error } = await supabase
            .from('teams')
            .update({ name: teamNameInput })
            .eq('id', team.id);

        if (!error) {
            setTeam({ ...team, name: teamNameInput });
            setEditingName(false);
        }
    };

    const handleRemoveUser = async (userId) => {
        const { error } = await supabase
            .from('users')
            .update({ team_id: null })
            .eq('id', userId);

        if (!error) {
            setMembers((prev) => prev.filter((m) => m.id !== userId));
        }
    };

    return (
        <div className="min-h-screen bg-white p-6 text-gray-800">
            <h1 className="text-2xl font-bold text-center mb-6">Team Management</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <>
                    {/* Team Info Section */}
                    <section className="bg-gray-100 p-4 rounded-lg shadow mb-6">
                        <div className="mb-2">
                            <strong>Team Name:</strong>{' '}
                            {editingName ? (
                                <>
                                    <input
                                        value={teamNameInput}
                                        onChange={(e) => setTeamNameInput(e.target.value)}
                                        className="border rounded px-2 py-1"
                                    />
                                    <button
                                        onClick={handleRenameTeam}
                                        className="ml-2 text-blue-600 font-medium"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingName(false)}
                                        className="ml-2 text-gray-500"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    {team.name}{' '}
                                    <button
                                        onClick={() => setEditingName(true)}
                                        className="text-sm text-blue-600 underline ml-2"
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <strong>Join Code:</strong>
                            <code className="bg-white border px-2 py-1 rounded">{team.join_code}</code>
                            <button
                                onClick={handleCopyJoinCode}
                                className="text-sm text-blue-600 underline"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <button
                                onClick={handleRegenerateCode}
                                className="text-sm text-red-600 underline ml-4"
                            >
                                Regenerate
                            </button>
                        </div>
                    </section>

                    {/* Team Members List */}
                    <section className="bg-gray-100 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-3">Team Members</h2>
                        {members.length === 0 ? (
                            <p className="text-sm text-gray-500">No users found in this team.</p>
                        ) : (
                            <ul className="space-y-2">
                                {members.map((m) => (
                                    <li key={m.id} className="flex justify-between text-sm">
                                        <span>
                                            {m.full_name || 'Unnamed'} – {m.email || 'No email'}{' '}
                                            {m.is_coach && <span className="text-xs text-blue-500">(Coach)</span>}
                                        </span>
                                        {!m.is_coach && (
                                            <button
                                                onClick={() => handleRemoveUser(m.id)}
                                                className="text-red-600 hover:underline text-xs"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}