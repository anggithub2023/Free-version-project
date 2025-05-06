import React, { useState } from 'react';

export default function EventForm({ onSave }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !date) return alert('Title and Date are required');
        onSave({ title, date, location });
        setTitle('');
        setDate('');
        setLocation('');
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
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
                className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded-lg transition"
            >
                Add Event
            </button>
        </form>
    );
}
