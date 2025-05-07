// src/pages/CreateTeamPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeam } from '../services/teamService';

export default function CreateTeamPage() {
    const [teamName, setTeamName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const team = await createTeam(teamName);
            alert(`✅ Team "${team.name}" created!`);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to create team');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 p-6 text-gray-800 dark:text-white">
            <h1 className="text-2xl font-bold text-center mb-6">Create a New Team</h1>

            <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
                <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Team Name"
                    required
                    className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
                >
                    {loading ? 'Creating...' : 'Create Team'}
                </button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
}