import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function TeamDashboardPage() {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .eq('id', teamId)
                .single();

            if (error) {
                setError('Unable to load team.');
            } else {
                setTeam(data);
            }

            setLoading(false);
        };

        fetchTeam();
    }, [teamId]);

    if (loading) return <div className="p-6">Loading team...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-3xl font-bold mb-4">{team.name}</h1>
            <p className="text-gray-600 mb-2">📍 Location: {team.location || 'N/A'}</p>
            <p className="text-gray-600 mb-6">🆔 Team ID: {team.id}</p>

            <div className="space-y-4">
                <Link
                    to={`/coach-profile`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Manage Coach Profile
                </Link>

                <Link
                    to={`/team/${teamId}/events/create`}
                    className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Create Team Event
                </Link>

                <Link
                    to={`/team/${teamId}/events/admin`}
                    className="block w-full text-center bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                >
                    Manage Events
                </Link>

                <Link
                    to={`/team/${teamId}/players`}
                    className="block w-full text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    View Players
                </Link>
            </div>
        </div>
    );
}