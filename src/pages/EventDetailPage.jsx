// src/pages/EventDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent } from '../services/schedulingService';
import EventCard from '../components/Scheduling/EventCard';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export default function EventDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { profile } = useCurrentUserProfile();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    const isCoach = profile?.is_coach;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
                setFormData({
                    title: data.title || '',
                    location: data.location || '',
                    event_date: data.event_date?.split('T')[0] || '',
                });
            } catch (err) {
                console.error('❌ Failed to fetch event:', err);
                setError('Could not load event details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchEvent();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const updated = await updateEvent(id, formData);
            setEvent(updated);
            setEditMode(false);
        } catch (err) {
            console.error('⚠️ Failed to update event:', err);
            setError('Failed to update event.');
        }
    };

    if (loading) return <p className="text-center mt-10">Loading event...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!event) return <p className="text-center mt-10 text-gray-500">Event not found.</p>;

    return (
        <div className="min-h-screen p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Event Details</h1>

            <EventCard
                event={event}
                userRSVP={null}
                onRSVP={null}
                showRSVPButtons={false}
            />

            {isCoach && (
                <div className="mt-6 max-w-xl mx-auto space-y-6">
                    {!editMode ? (
                        <div className="flex justify-between">
                            <button
                                onClick={() => setEditMode(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
                            >
                                ✏️ Edit Event
                            </button>
                            <button
                                onClick={() => navigate('/scheduling/coach')}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                ← Back to Dashboard
                            </button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <label className="block font-semibold mb-1">Title</label>
                                <input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Location</label>
                                <input
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Event Date</label>
                                <input
                                    type="date"
                                    value={formData.event_date}
                                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={handleUpdate}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                                >
                                    ✅ Save
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                    ❌ Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}