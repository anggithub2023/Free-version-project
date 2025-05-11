import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheckCircleFill, BsFillPeopleFill } from 'react-icons/bs';
import supabase from '../lib/supabaseClient';

export default function TeamDashboard() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState(null); // placeholder for any future error handling

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);

            const {
                data: sessionData,
                error: sessionError,
            } = await supabase.auth.getSession();

            if (sessionError || !sessionData?.session?.user) {
                setError('Unable to fetch user session');
                setLoading(false);
                return;
            }

            const userId = sessionData.session.user.id;

            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .eq('created_by', userId);

            if (error) {
                setError(error.message);
            } else {
                setTeams(data);
            }

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

            <h1 className="text-2xl font-semibold mb-4">Your Teams</h1>

            {loading ? (
                <div className="text-center mt-10 text-gray-500">Loading teams...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {teams.map((team) => (
                        <div
                            key={team.id}
                            onClick={() => navigate(`/team/${team.id}/dashboard`)}
                            className="cursor-pointer bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
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

            <div className="mt-10 text-center">
                <button
                    onClick={() => navigate('/create-team')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
                >
                    + Create New Team
                </button>

                <div>
                    <button
                        onClick={() => navigate('/coach-profile')}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Manage Coach Profile
                    </button>
                </div>
            </div>
        </div>
    );
}