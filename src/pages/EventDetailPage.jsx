// src/pages/EventDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent } from '../services/schedulingService';

export default function EventDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const fetched = await getEventById(id);
                setEvent(fetched);
            } catch (err) {
                setError('Failed to load event.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await updateEvent(id, event);
            navigate('/scheduling/coach');
        } catch (err) {
            console.error('Failed to update:', err);
            setError('Update failed');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
            <h1 className="text-xl font-semibold">Edit Event</h1>
            <input
                type="text"
                name="title"
                value={event.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Event Title"
            />
            <input
                type="datetime-local"
                name="event_date"
                value={new Date(event.event_date).toISOString().slice(0, 16)}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />
            <input
                type="text"
                name="location"
                value={event.location || ''}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Location"
            />
            <div className="flex justify-between">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save Changes
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-600 underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
