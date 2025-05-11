import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import supabase from '../lib/supabaseClient';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPeopleFill, BsCalendarEvent } from 'react-icons/bs';
import { useTeam } from '../context/TeamContext';

export default function TeamDashboard() {
    const { teamId } = useParams();
    const { team } = useTeam();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('teams')
                .select('name')
                .eq('id', teamId)
                .single();

            if (!error) setTeam(data);
            setLoading(false);
        };

        fetchTeam();
    }, [teamId]);

    if (loading) {
        return <div className="text-center mt-10 text-gray-600">Loading dashboard...</div>;
    }

    if (!team) {
        return <div className="text-center mt-10 text-red-600">Team not found.</div>;
    }
    const handleAddPlayers = () => navigate('/create-team');
    const handleCreateEvent = () => navigate(`/team/${team.id}/events/create`);
    const handleManageProfile = () => navigate('/coach-profile');
    const handleViewTeam = () => navigate(`/team/${team.id}/dashboard`);

    return (
        <div className="max-w-2xl mx-auto mt-10 font-sans px-4">
            {/* 🔖 Site Header */}
            <div className="max-w-2xl mx-auto px-4 py-8 font-poppins">
                <div className="flex items-center justify-center gap-2 text-sm font-medium mb-8">
                    <BsCheckCircleFill className="text-black dark:text-white" />
                    <span>processwins.app</span>
                    <div className="text-black dark:text-white">processwins.app</div>
                </div>

                <h1 className="text-3xl font-bold mb-6 text-center">{team.name}</h1>

                <div className="grid gap-5">
                    <button
                        onClick={() => navigate('/create-event')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded text-lg"
                    >
                        ➕ Create Event
                    </button>
                    <div
                        className="bg-white shadow rounded-2xl p-6 mb-6 cursor-pointer hover:shadow-lg transition"
                        onClick={handleViewTeam}
                    >
                        <h2 className="text-lg font-bold mb-2">{team.name}</h2>
                        <p className="text-sm text-gray-600 mb-4">{team.location}</p>

                        <button
                            onClick={() => navigate('/videos')}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded text-lg"
                        >
                            🎥 Share a Video
                        </button>

                        <button
                            onClick={() => navigate('/results')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded text-lg"
                        >
                            📊 Enter Match Results
                        </button>
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

                    <button
                        onClick={() => navigate('/workouts')}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded text-lg"
                    >
                        🏋️‍♂️ Assign Workout
                    </button>

                    <div className="mt-10 flex flex-col items-center">
                        <button
                            onClick={() => navigate('/create-team')}
                            className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded text-lg"
                            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            ➕ Create Another Team
                            + Create New Team
                        </button>
                    </div>

                    <div className="mt-10 text-center">
                        <button
                            onClick={() => navigate('/coach-profile')}
                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                            onClick={handleManageProfile}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            ⚙️ Manage Coach Profile
                            Manage Coach Profile
                        </button>
                    </div>
                </div>
                );
                }

