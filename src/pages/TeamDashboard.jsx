// src/pages/TeamDashboard.jsx
import React from 'react';
import { useTeamContext } from '../context/TeamContext';

export default function TeamDashboard() {
    const { teamName, teamId, coachId, loading } = useTeamContext();

    if (loading) {
        return <div className="p-6 text-center">Loading team data...</div>;
    }

    if (!teamId) {
        return <div className="p-6 text-center text-red-500">No team selected or found.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded font-sans">
            <h1 className="text-2xl font-semibold mb-2">Team Dashboard</h1>
            <p className="text-gray-700">Team ID: <span className="font-mono">{teamId}</span></p>
            <p className="text-gray-700">Team Name: {teamName || 'Unnamed'}</p>
            <p className="text-gray-700">Coach ID: <span className="font-mono">{coachId}</span></p>
        </div>
    );
}