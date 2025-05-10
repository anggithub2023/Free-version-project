// src/pages/CreateTeamPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = '/teams';

const CreateTeamPage = () => {
    const [teamName, setTeamName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!teamName.trim()) {
            setError('Team name is required');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${API_BASE}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: teamName }),
            });

            if (!res.ok) {
                const msg = await res.text(); // Optional: parse JSON if error body is structured
                setError(msg || 'Failed to create team');
                return;
            }

            const data = await res.json();
            navigate(`/team/${data.id}/dashboard`);

        } catch (err) {
            setError(err.message || 'Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create a Team</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {loading ? 'Creating...' : 'Create Team'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default CreateTeamPage;