// src/pages/TeamManagementPage.jsx
import React, { useEffect, useState } from 'react';
import { schedulingSupabase as supabase } from '../lib/schedulingClient';

export default function TeamManagementPage() {
    const [team, setTeam] = useState(null);
    const [members, setMembers] = useState([]);
    const [editingName, setEditingName] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchTeamData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: profile, error: profileError } = await supabase
                .from('users')
                .select('team_id')
                .eq('id', user.id)
                .single();

            if (profileError || !profile?.team_id) {
                setErrorMsg('Failed to load team profile.');
                return;
            }

            const teamId = profile.team_id;

            const { data: teamData } = await supabase
                .from('teams')
                .select('*')
                .eq('id', teamId)
                .single();

            const { data: userList } = await supabase
                .from('users')
                .select('id, full_name, email, is_coach')
                .eq('team_id', teamId);

            setTeam(teamData);
            setNewTeamName(teamData.name);
            setMembers(userList);
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamData();
    }, []);

    const handleCopy = () => {
        if (team?.join_code) {
            navigator.clipboard.writeText(team.join_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleRegenerateJoinCode = async () => {
        const newCode = crypto.randomUUID().slice(0, 6);
        const { error } = await supabase
            .from('teams')
            .update({ join_code: newCode })
            .eq('id', team.id);

        if (!error) {
            setTeam({ ...team, join_code: newCode });
        }
    };

    const handleUpdateTeamName = async () => {
        const { error } = await supabase
            .from('teams')
            .update({ name: newTeamName })
            .eq('id', team.id);

        if (!error) {
            setTeam({ ...team, name: newTeamName });
            setEditingName(false);
        }
    };

    const handleRemoveUser = async (userId) => {
        const { error } = await supabase
            .from('users')
            .update({ team_id: null })
            .eq('id', userId);

        if (!error) {
            setMembers(members.filter((m) => m.id !== userId));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-800 dark:text-white font-sans">
            <h1 className="text-2xl font-bold text-center mb-6">Team Management</h1>

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
            ) : errorMsg ? (
                <p className="text-center text-red-500">{errorMsg}</p>
            ) : (
                <>
                    {/* Team Info */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 space-y-2">
                        <div>
                            <strong>Team Name:</strong>{' '}
                            {editingName ? (
                                <span>
                                    <input
                                        className="px-2 py-1 rounded border bg-white dark:bg-gray-700"
                                        value={newTeamName}
                                        onChange={(e) => setNewTeamName(e.target.value)}
                                    />
                                    <button onClick={handleUpdateTeamName} className="ml-2 text-blue-600">Save</button>
                                    <button onClick={() => setEditingName(false)} className="ml-1 text-gray-500">Cancel</button>
                                </span>
                            ) : (
                                <span>
                                    {team?.name}{' '}
                                    <button onClick={() => setEditingName(true)} className="text-blue-500 underline text-sm">Edit</button>
                                </span>
                            )}
                        </div>

                        <div className="flex items-center">
                            <strong className="mr-2">Join Code:</strong>
                            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{team?.join_code}</code>
                            <button
                                onClick={handleCopy}
                                className="ml-2 text-blue-600 hover:underline text-sm"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <button
                                onClick={handleRegenerateJoinCode}
                                className="ml-4 text-sm text-red-600 hover:underline"
                            >
                                Regenerate
                            </button>
                        </div>
                    </div>

                    {/* Members List */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-3">Team Members</h2>
                        {members.length === 0 ? (
                            <p className="text-sm text-gray-500">No users found in this team.</p>
                        ) : (
                            <ul className="space-y-2">
                                {members.map((m) => (
                                    <li key={m.id} className="text-sm flex justify-between">
                                        <span>{m.full_name || 'Unnamed'} – {m.email || 'No email'} {m.is_coach && '(Coach)'}</span>
                                        {!m.is_coach && (
                                            <button
                                                onClick={() => handleRemoveUser(m.id)}
                                                className="text-red-600 text-xs hover:underline"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}