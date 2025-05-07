import React, { useState } from 'react';
import { createEvent } from '../services/schedulingService';
import { useNavigate } from 'react-router-dom';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile'; // 🔥 Add this

export default function CreateEventPage() {
    const { profile, loading: profileLoading, error } = useCurrentUserProfile(); // ✅ Get user info
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
            navigate('/scheduling');
        } catch (err) {
            alert('❌ Failed to create event');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (profileLoading) return <p className="text-center mt-10">Loading profile...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error loading profile</p>;
    if (!profile?.is_coach) return <p className="text-center mt-10 text-gray-500">Only coaches can create events.</p>;

    return (
        <div className="max-w-xl mx-auto p-6 font-['Inter'] text-gray-800 dark:text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Event Title"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    required
                />
                <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    required
                />
                <input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    required
                />
                <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location (Optional)"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Additional Notes"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 min-h-[100px]"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition"
                >
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
}