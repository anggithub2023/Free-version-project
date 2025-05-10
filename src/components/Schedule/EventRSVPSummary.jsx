import React, { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useTeamContext } from '../../context/TeamContext';

export default function EventRSVPSummary() {
    const { teamId } = useTeamContext();
    const [eventSummaries, setEventSummaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRSVPData = async () => {
            setLoading(true);
            setError('');

            if (!teamId) {
                setError('Missing team context');
                setLoading(false);
                return;
            }

            const { data: events, error: eventsError } = await supabase
                .from('events')
                .select('id, title, event_date')
                .eq('team_id', teamId)
                .order('event_date', { ascending: false });

            if (eventsError || !events) {
                setError('Unable to load events');
                setLoading(false);
                return;
            }

            const { data: rsvps, error: rsvpsError } = await supabase
                .from('rsvps')
                .select('event_id, response');

            if (rsvpsError || !rsvps) {
                setError('Unable to load RSVP data');
                setLoading(false);
                return;
            }

            const summaries = events.map(event => {
                const responses = rsvps.filter(r => r.event_id === event.id);
                const yes = responses.filter(r => r.response === 'yes').length;
                const no = responses.filter(r => r.response === 'no').length;
                return {
                    ...event,
                    yes,
                    no,
                    total: responses.length,
                };
            });

            setEventSummaries(summaries);
            setLoading(false);
        };

        fetchRSVPData();
    }, [teamId]);

    if (loading) return <p className="mt-6 text-center">Loading RSVP summary...</p>;
    if (error) return <p className="mt-6 text-red-500">{error}</p>;

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">RSVP Summary</h2>
            <ul className="space-y-3">
                {eventSummaries.map((event) => (
                    <li key={event.id} className="border rounded p-4">
                        <h3 className="font-bold">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.event_date}</p>
                        <p className="mt-2 text-sm">
                            ✅ Yes: {event.yes} | ❌ No: {event.no} | Total: {event.total}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}