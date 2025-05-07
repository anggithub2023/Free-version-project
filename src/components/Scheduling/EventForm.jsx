import React, { useState } from 'react';
import supabase from 'src/lib/supabaseClient.js'; // ✅ Default import from unified client

export default function EventForm({ onSave }) {
    const [title, setTitle] = useState('');
    const [datetime, setDatetime] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !datetime) return alert('Title and date/time are required');

        const [datePart, timePart] = datetime.split('T');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) return alert('User not authenticated');

        const event = {
            title,
            event_date: datePart,
            event_time: timePart || null,
            location,
            created_by: session.user.id,
        };

        setLoading(true);
        try {
            await onSave(event); // call createEvent
            setTitle('');
            setDatetime('');
            setLocation('');
        } catch (err) {
            alert(err.message || 'Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                    placeholder="e.g., Practice or Game"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date & Time</label>
                <input
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                    placeholder="Optional"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded-lg transition"
            >
                {loading ? 'Saving...' : 'Add Event'}
            </button>
        </form>
    );
}