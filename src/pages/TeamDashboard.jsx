import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill, BsPeopleFill, BsCalendarEvent } from 'react-icons/bs';
import supabase from '../lib/supabaseClient';

export default function TeamDashboard() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('teams')
                .select('name, location')
                .eq('id', teamId)
                .single();

            if (!error) setTeam(data);
            setLoading(false);
        };

        fetchTeam();
    }, [teamId]);

    const handleAddPlayers = () => navigate('/create-team');
    const handleCreateEvent = () => navigate(`/team/${teamId}/events/create`);
    const handleManageProfile = () => navigate('/coach-profile');

    if (loading) {
        return <div className="text-center mt-10 text-gray-600">Loading dashboard...</div>;
    }

    if (!team) {
        return <div className="text-center mt-10 text-red-600">Team not found.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 font-poppins px-4">
            {/* ✅ processwins header */}
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-8">
                <BsCheckCircleFill className="text-black dark:text-white" />
                <span>processwins.app</span>
            </div>

            {/* ✅ Team card */}
            <div className="bg-white shadow rounded-2xl p-6 mb-6 hover:shadow-lg transition">
                <h2 className="text-lg font-bold mb-2">{team.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{team.location}</p>

                <div className="flex flex-wrap gap-4">
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

            {/* ✅ Actions */}
            <div className="mt-10 flex flex-col items-center gap-4">
                <button
                    onClick={() => navigate('/create-team')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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