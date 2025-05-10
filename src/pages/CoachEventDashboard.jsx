import React from 'react';
import { useTeamContext } from '../context/TeamContext';
import EventRSVPSummary from '../components/Schedule/EventRSVPSummary';
import { Link } from 'react-router-dom';

export default function CoachEventDashboard() {
    const { teamId, teamName } = useTeamContext();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 font-[Poppins]">
            <h1 className="text-2xl font-bold mb-2">Coach Dashboard</h1>
            <p className="text-gray-600 mb-6">Team: <strong>{teamName || '...'}</strong></p>

            <div className="mb-4">
                <Link
                    to={`/team/${teamId}/events/create`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Create New Event
                </Link>
            </div>

            <EventRSVPSummary />
        </div>
    );
}