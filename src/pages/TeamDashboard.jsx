// src/pages/TeamDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useTeamContext } from '../context/TeamContext';
import supabase from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function TeamDashboard() {
    const { teamId, teamName } = useTeamContext();
    const [members, setMembers] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!teamId) return;

            setLoading(true);

            const { data: memberData } = await supabase
                .from('team_memberships')
                .select('user_id')
                .eq('team_id', teamId);

            const { data: eventData } = await supabase
                .from('events')
                .select('*')
                .eq('team_id', teamId)
                .order('created_at', { ascending: false })
                .limit(5);

            setMembers(memberData || []);
            setEvents(eventData || []);
            setLoading(false);
        };

        fetchData();
    }, [teamId]);

    if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-indigo-700 mb-4">Team: {teamName || 'Untitled'}</h1>

            <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Recent Events</h2>
                {events.length > 0 ? (
                    <ul className="space-y-2">
                        {events.map((event) => (
                            <li key={event.id} className="p-4 bg-gray-100 rounded">
                                <strong>{event.name}</strong> — {new Date(event.created_at).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No events yet.</p>
                )}
                <button
                    onClick={() => navigate(`/team/${teamId}/events/create`)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Create Event
                </button>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-2">Team Members</h2>
                <p>Total: {members.length}</p>
            </section>
        </div>
    );
}