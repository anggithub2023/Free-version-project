import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import supabase from '../lib/supabaseClient';

export default function TeamDashboard() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('teams')
                .select('id, name, location')
                .eq('created_by', user.id);

            if (!error && data) setTeams(data);
            setLoading(false);
        };

        fetchTeams();
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10 font-poppins px-4">
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-8">
                <BsCheckCircleFill className="text-black dark:text-white" />
                <span>processwins.app</span>
            </div>

            <h1 className="text-2xl font-semibold mb-6">Your Teams</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading teams...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teams.map((team) => (
                        <div
                            key={team.id}
                            onClick={() => navigate(`/team/${team.id}/dashboard`)}
                            className="bg-white shadow rounded-xl p-4 cursor-pointer hover:shadow-md transition border border-gray-200"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span role="img" aria-label="basketball" className="text-2xl">
                                    🏀
                                </span>
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
