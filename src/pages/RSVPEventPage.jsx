// src/pages/CreateEventPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';

export default function CreateEventPage() {
    const [title, setTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [location, setLocation] = useState('');
    const [opponent, setOpponent] = useState('');
    const [eventType, setEventType] = useState('');
    const [notes, setNotes] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        try {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError) {
                setErrorMsg(userError.message);
                return;
            }

            const teamId = 'your-team-id'; // Replace with dynamic logic later

            const { error } = await supabase.from('events').insert([
                {
                    title,
                    event_date: eventDate,
                    event_time: eventTime || null,
                    location: location || null,
                    notes: notes || null,
                    team_id: teamId,
                    created_by: user.id,
                    description: opponent ? `vs ${opponent}` : null,
                    event_type: eventType || null,
                },
            ]);

            if (error) {
                setErrorMsg(error.message);
                return;
            }

            navigate('/dashboard');
        } catch (err) {
            setErrorMsg(err.message || 'Unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 mt-10 border rounded shadow">
            <h1 className="text-2xl font-semibold mb-6">Create Event</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Location (optional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Opponent (optional)"
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Event Type (e.g., Practice, Game)"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <textarea
                    placeholder="Additional Notes (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border p-2 rounded"
                    rows={3}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            </form>
        </div>
    );
}