// src/pages/CreateEventPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/schedulingService';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';

export default function CreateEventPage() {
    const { profile, loading: profileLoading, error } = useCurrentUserProfile();
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const event_date = new Date(`${formData.date}T${formData.time}`);
            await createEvent({
                title: formData.title,
                event_date,
                location: formData.location,
                notes: formData.notes
            });
            navigate('/scheduling/events');
        } catch (err) {
            console.error('❌ Failed to create event:', err);
            alert('Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };

    if (profileLoading) return <p className="text-center mt-10">Loading profile...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error loading profile</p>;
    if (!profile?.is_coach) return <p className="text-center mt-10 text-gray-500">Only coaches can create events.</p>;

    return (
        <main className="min-h-screen p-6 bg-gray-50 text-gray-800 font-sans">
            <h1 className="text-3xl font-bold text-center mb-8">Create New Event</h1>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg space-y-5">
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Team Practice"
                        required
                        className="w-full border rounded-md px-4 py-2"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block font-medium mb-1">Date</label>
                        <input
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-md px-4 py-2"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block font-medium mb-1">Time</label>
                        <input
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-md px-4 py-2"
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-medium mb-1">Location</label>
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Main Field"
                        className="w-full border rounded-md px-4 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Optional notes or instructions"
                        className="w-full border rounded-md px-4 py-2 min-h-[100px]"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
                >
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </main>
    );
}