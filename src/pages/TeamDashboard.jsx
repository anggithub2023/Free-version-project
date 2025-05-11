import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPeopleFill, BsCalendarEvent } from 'react-icons/bs';
import { useTeam } from '../context/TeamContext';

export default function TeamDashboard() {
    const { team } = useTeam();
    const navigate = useNavigate();

    const handleAddPlayers = () => navigate('/create-team');
    const handleCreateEvent = () => navigate(`/team/${team.id}/events/create`);
    const handleManageProfile = () => navigate('/coach-profile');
    const handleViewTeam = () => navigate(`/team/${team.id}/dashboard`);

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 font-poppins">
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-8">
                <div className="text-black dark:text-white">processwins.app</div>
            </div>

            <div
                className="bg-white shadow rounded-2xl p-6 mb-6 cursor-pointer hover:shadow-lg transition"
                onClick={handleViewTeam}
            >
                <h2 className="text-lg font-bold mb-2">{team.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{team.location}</p>

                <div className="flex gap-4">
                    <button
                        onClick={handleAddPlayers}
                        className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50"
                    >
                        <BsPeopleFill /> Add Players
                    </button>
                    <button
                        onClick={handleCreateEvent}
                        className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50"
                    >
                        <BsCalendarEvent /> Create Event
                    </button>
                </div>
            </div>

            <div className="mt-10 flex flex-col items-center">
                <button
                    onClick={() => navigate('/create-team')}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + Create New Team
                </button>

                <button
                    onClick={handleManageProfile}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Manage Coach Profile
                </button>
            </div>
        </div>
    );
}
