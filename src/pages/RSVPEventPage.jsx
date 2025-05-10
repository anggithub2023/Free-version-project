import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function RSVPEventPage() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [rsvpStatus, setRsvpStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch event + current RSVP
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                    setError('You must be logged in to RSVP.');
                    setLoading(false);
                    return;
                }

                const { data: eventData, error: eventErr } = await supabase
                    .from('events')
                    .select('*')
                    .eq('id', eventId)
                    .single();

                if (eventErr || !eventData) {
                    setError('Event not found.');
                    setLoading(false);
                    return;
                }

                setEvent(eventData);

                const { data: rsvpData } = await supabase
                    .from('rsvps')
                    .select('response')
                    .eq('event_id', eventId)
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (rsvpData?.response) setRsvpStatus(rsvpData.response);
            } catch (err) {
                setError('Error loading RSVP data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId]);

    const handleRSVP = async (response) => {
        setSubmitLoading(true);
        setError('');
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            const { error: upsertError } = await supabase.from('rsvps').upsert(
                {
                    event_id: eventId,
                    user_id: user.id,
                    response,
                },
                { onConflict: ['event_id', 'user_id'] }
            );

            if (upsertError) {
                setError('Failed to update RSVP.');
                return;
            }

            setRsvpStatus(response);
        } catch (err) {
            setError('Unexpected error occurred.');
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading event...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
            <p className="mb-1 text-gray-700">
                📅 {event.event_date} at {event.event_time || 'TBD'}
            </p>
            <p className="mb-3 text-gray-700">
                📍 {event.location || 'No location provided'}
            </p>

            <div className="space-x-4 mt-4">
                <button
                    className={`px-4 py-2 rounded ${
                        rsvpStatus === 'yes' ? 'bg-green-600 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleRSVP('yes')}
                    disabled={submitLoading}
                >
                    {submitLoading && rsvpStatus !== 'yes' ? 'Saving...' : 'RSVP Yes'}
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        rsvpStatus === 'no' ? 'bg-red-600 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleRSVP('no')}
                    disabled={submitLoading}
                >
                    {submitLoading && rsvpStatus !== 'no' ? 'Saving...' : 'RSVP No'}
                </button>
            </div>

            {rsvpStatus && (
                <p className="mt-4 text-sm text-gray-600">Your RSVP: {rsvpStatus}</p>
            )}
        </div>
    );
}