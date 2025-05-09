// src/pages/EventDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../services/schedulingService';
import EventCard from '../components/Scheduling/EventCard';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export default function EventDetailPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { profile } = useCurrentUserProfile();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (err) {
                console.error('❌ Failed to fetch event:', err);
                setError('Could not load event details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchEvent();
    }, [id]);

    const handleUpdate = async (updatedFields) => {
        try {
            const updated = await updateEvent(id, updatedFields);
            setEvent(updated);
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
                editable={profile?.is_coach}
                onSave={handleUpdate}
            />
        </div>
    );
}
