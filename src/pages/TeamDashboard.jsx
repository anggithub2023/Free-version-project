// TeamDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaBasketballBall } from 'react-icons/fa';
import supabase from '../lib/supabaseClient';

export default function TeamDashboard() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            const {
                data: { user },
                error: userError
            } = await supabase.auth.getUser();

            if (userError || !user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .eq('created_by', user.id);

            if (!error) setTeams(data || []);
            setLoading(false);
        };

        fetchTeams();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-gray-600">Loading teams...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 font-poppins">
            {/* ✅ App Header */}
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-8">
                <BsCheckCircleFill className="text-black dark:text-white" />
                <span>processwins.app</span>
            </div>

            {/* ✅ Team Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        onClick={() => navigate(`/team/${team.id}/dashboard`)}
                        className="bg-white rounded-xl shadow hover:shadow-md p-5 cursor-pointer transition"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <FaBasketballBall className="text-orange-500 text-xl" />
                            <h3 className="text-lg font-semibold">{team.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{team.location || 'No location set'}</p>
                        <div className="mt-2 text-xs text-gray-400">0-0</div> {/* Static placeholder */}
                    </div>
                ))}
            </div>

            {/* ✅ Actions */}
            <div className="mt-10 flex flex-col items-center">
                <button
                    onClick={() => navigate('/create-team')}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + Create New Team
                </button>

                <button
                    onClick={() => navigate('/coach-profile')}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Manage Coach Profile
                </button>
            </div>
        </div>
    );
}