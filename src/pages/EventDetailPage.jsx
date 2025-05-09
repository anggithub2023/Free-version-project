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
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        event_date: '',
    });

    const isCoach = profile?.is_coach;

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
                setFormData({
                    title: data.title || '',
                    location: data.location || '',
                    event_date: data.event_date?.split('T')[0] || '',
                });
            } catch (err) {
                console.error('❌ Error loading event:', err);
                setError('Unable to load event.');
            } finally {
                setLoading(false);
            }
        };

        if (id) loadEvent();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const updated = await updateEvent(id, formData);
            setEvent(updated);
            setEditMode(false);
        } catch (err) {
            console.error('⚠️ Update failed:', err);
            setError('Failed to update event.');
        }
    };

    if (loading) return <p className="text-center mt-10">Loading event...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!event) return <p className="text-center mt-10 text-gray-500">Event not found.</p>;

    return (
        <div className="min-h-screen p-4 font-sans text-gray-800 dark:text-white">
            <h1 className="text-2xl font-bold text-center mb-6">Event Details</h1>

            <EventCard event={event} userRSVP={null} showRSVPButtons={false} />

            {isCoach && (
                <div className="mt-6 max-w-xl mx-auto space-y-5">
                    {!editMode ? (
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setEditMode(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
                            >
                                ✏️ Edit
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
                            {['title', 'location', 'event_date'].map((field) => (
                                <div key={field}>
                                    <label className="block font-semibold mb-1 capitalize">
                                        {field.replace('_', ' ')}
                                    </label>
                                    <input
                                        type={field === 'event_date' ? 'date' : 'text'}
                                        value={formData[field]}
                                        onChange={(e) =>
                                            setFormData({ ...formData, [field]: e.target.value })
                                        }
                                        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                                    />
                                </div>
                            ))}

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