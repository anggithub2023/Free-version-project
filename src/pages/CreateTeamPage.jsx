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
            console.error('❌ Team creation failed:', err);
            setError('Failed to create team. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 p-6 text-gray-800 font-sans">
            <h1 className="text-3xl font-bold text-center mb-8">Create a Team</h1>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5 bg-white shadow p-6 rounded-xl">
                <div>
                    <label htmlFor="teamName" className="block text-sm font-medium mb-1">
                        Team Name
                    </label>
                    <input
                        id="teamName"
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. Wildcats U14"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
                >
                    {loading ? 'Creating...' : 'Create Team'}
                </button>

                {error && <p className="text-center text-sm text-red-600">{error}</p>}
            </form>
        </main>
    );
}