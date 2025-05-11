import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
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

    return (
        <div className="max-w-2xl mx-auto mt-10 font-sans px-4">
            {/* 🔖 Site Header */}
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-8">
                <BsCheckCircleFill className="text-black dark:text-white" />
                <span>processwins.app</span>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center">{team.name}</h1>

            <div className="grid gap-5">
                <button
                    onClick={() => navigate('/create-event')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded text-lg"
                >
                    ➕ Create Event
                </button>

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

                <button
                    onClick={() => navigate('/workouts')}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded text-lg"
                >
                    🏋️‍♂️ Assign Workout
                </button>

                <button
                    onClick={() => navigate('/create-team')}
                    className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded text-lg"
                >
                    ➕ Create Another Team
                </button>
            </div>

            <div className="mt-10 text-center">
                <button
                    onClick={() => navigate('/coach-profile')}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    ⚙️ Manage Coach Profile
                </button>
            </div>
        </div>
    );
}