import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function CoachEventDashboard() {
    const { teamId } = useParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('team_id', teamId)
                .order('event_date', { ascending: true });

            if (error) {
                setError(error.message);
                console.error('Error fetching events:', error);
            } else {
                setEvents(data);
            }
            setLoading(false);
        };

        if (teamId) fetchEvents();
    }, [teamId]);

    if (loading) return <div className="p-6 text-center">Loading events...</div>;
    if (error) return <div className="p-6 text-red-500 text-center">Error: {error}</div>;
    if (events.length === 0) return <div className="p-6 text-center text-gray-500">No events yet.</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4 font-[Poppins]">
            <h2 className="text-2xl font-bold text-center mb-6">Manage Events</h2>
            <ul className="space-y-4">
                {events.map((event) => (
                    <li key={event.id} className="border rounded p-4 shadow-sm">
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.event_date} at {event.event_time}</p>
                        <p className="text-sm text-gray-500">Location: {event.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}