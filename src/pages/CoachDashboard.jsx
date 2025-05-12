// src/pages/CoachDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheckCircleFill, BsFillPeopleFill } from 'react-icons/bs';
import supabase from '../lib/supabaseClient';

export default function CoachDashboard() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            setError(null);

            const { data: authData, error: userError } = await supabase.auth.getUser();

            const userId = authData?.user?.id;
            if (!userId || userError) {
                setError('Unable to fetch user session.');
                setLoading(false);
                return;
            }

            const { data, error: fetchError } = await supabase
                .from('teams')
                .select('id, name, location')
                .eq('created_by', userId);

            if (fetchError) {
                setError(fetchError.message);
                setLoading(false);
                return;
            }

            if (data.length === 0) {
                navigate('/create-team'); // GC-style redirect for new coach
                return;
            }

            setTeams(data);
            setLoading(false);
        };

        fetchTeams();
    }, [navigate]);

    return (
        <div className="max-w-3xl mx-auto mt-10 font-poppins px-4">
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-8">
                <BsCheckCircleFill className="text-black dark:text-white" />
                <span>processwins.app</span>
            </div>

            <h1 className="text-2xl font-semibold mb-4 text-center">Your Teams</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading teams...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {teams.map((team) => (
                        <div
                            key={team.id}
                            onClick={() => navigate(`/team/${team.id}/admin`)}
                            className="cursor-pointer bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition border border-gray-200"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <BsFillPeopleFill className="text-blue-600 text-lg" />
                                <h2 className="text-lg font-bold">{team.name}</h2>
                            </div>
                            <p className="text-sm text-gray-600">{team.location}</p>
                        </div>
                    ))}
                </div>
            )}

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