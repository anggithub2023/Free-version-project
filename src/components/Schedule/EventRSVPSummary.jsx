// src/components/Schedule/EventRSVPSummary.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTeamContext } from '../../context/TeamContext';
import supabase from '../../lib/supabaseClient';

export default function EventRSVPSummary() {
    const { teamId } = useTeamContext();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('id, title, event_date')
                .eq('team_id', teamId)
                .order('event_date', { ascending: true });

            if (error) setError('Failed to load events');
            else setEvents(data || []);

            setLoading(false);
        };

        if (teamId) fetchEvents();
    }, [teamId, refreshKey]);

    const handleDelete = async (id) => {
        const confirm = window.confirm('Delete this event?');
        if (!confirm) return;

        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) alert('Error deleting event');
        else setRefreshKey((k) => k + 1); // Trigger re-fetch
    };

    if (loading) return <p>Loading events...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (events.length === 0) return <p>No events found.</p>;

    return (
        <div className="space-y-4">
            {events.map((ev) => (
                <div
                    key={ev.id}
                    className="border rounded p-4 flex items-center justify-between"
                >
                    <div>
                        <h2 className="font-semibold">{ev.title}</h2>
                        <p className="text-sm text-gray-600">{ev.event_date}</p>
                        <Link
                            to={`/team/${teamId}/events/${ev.id}`}
                            className="text-blue-600 text-sm underline"
                        >
                            View RSVPs
                        </Link>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleDelete(ev.id)}
                            className="text-red-600 text-sm hover:underline"
                        >
                            Delete
                        </button>
                        {/* Placeholder for Edit */}
                        <button className="text-gray-500 text-sm cursor-not-allowed">
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}